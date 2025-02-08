const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentalAgreement", function () {
    let RentalAgreement, rentalAgreement;
    let landlord, tenant;
    let rentAmount, securityDeposit, dueDate;

    beforeEach(async function () {
        [landlord, tenant] = await ethers.getSigners();
    
        rentAmount = ethers.parseEther("0.1");
        securityDeposit = ethers.parseEther("0.5");
        dueDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    
        RentalAgreement = await ethers.getContractFactory("RentalAgreement");
        
        // Send security deposit during contract deployment
        rentalAgreement = await RentalAgreement.deploy(
            tenant.address,
            rentAmount,
            securityDeposit,
            dueDate,
            { value: securityDeposit } // Ensure contract has ETH
        );
    
        await rentalAgreement.waitForDeployment();
    });
    

    it("should set the correct landlord and tenant", async function () {
        expect(await rentalAgreement.landlord()).to.equal(landlord.address);
        expect(await rentalAgreement.tenant()).to.equal(tenant.address);
    });

    it("should allow the tenant to pay rent", async function () {
        await expect(
            rentalAgreement.connect(tenant).payRent({ value: rentAmount })
        ).to.changeEtherBalances([landlord, tenant], [rentAmount, -rentAmount]);
    });

    it("should not allow others to pay rent", async function () {
        await expect(
            rentalAgreement.connect(landlord).payRent({ value: rentAmount })
        ).to.be.revertedWith("Only the tenant can call this function.");
    });

    it("should not allow underpayment of rent", async function () {
        await expect(
            rentalAgreement.connect(tenant).payRent({ value: ethers.parseEther("0.05") })
        ).to.be.revertedWith("Incorrect rent amount.");
    });

    it("should not allow rent payment after due date", async function () {
        // Fast-forward time beyond the due date
        await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 31]); // 31 days
        await ethers.provider.send("evm_mine");

        await expect(
            rentalAgreement.connect(tenant).payRent({ value: rentAmount })
        ).to.be.revertedWith("Payment is overdue.");
    });

    it("should allow the landlord to terminate the agreement", async function () {
        await rentalAgreement.connect(landlord).terminateAgreement();
        expect(await rentalAgreement.isActive()).to.equal(false);
    });

    it("should not allow the tenant to terminate the agreement", async function () {
        await expect(
            rentalAgreement.connect(tenant).terminateAgreement()
        ).to.be.revertedWith("Only the landlord can call this function.");
    });

    it("should allow the landlord to refund the security deposit after termination", async function () {
        await rentalAgreement.connect(landlord).terminateAgreement();

        await expect(
            rentalAgreement.connect(landlord).refundDeposit()
        ).to.changeEtherBalances([tenant, rentalAgreement], [securityDeposit, -securityDeposit]);
    });

    it("should not allow deposit refund if agreement is active", async function () {
        await expect(
            rentalAgreement.connect(landlord).refundDeposit()
        ).to.be.revertedWith("Agreement is still active.");
    });
});
