pragma solidity ^0.8.0;

contract TorRent {
    struct Agreement {
        address landlord;
        address tenant;
        uint256 rent;
        uint256 deposit;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        bool depositPaid;
    }

    mapping(uint256 => Agreement) public agreements;
    uint256 public agreementCount;

    event AgreementCreated(
        uint256 indexed agreementId,
        address indexed landlord,
        address indexed tenant,
        uint256 rent,
        uint256 deposit,
        uint256 startDate,
        uint256 endDate
    );

    event DepositPaid(uint256 indexed agreementId, address indexed tenant, uint256 amount);
    event RentPaid(uint256 indexed agreementId, address indexed tenant, uint256 amount);
    event DepositRefunded(uint256 indexed agreementId, address indexed tenant, uint256 amount);
    event DisputeRaised(uint256 indexed agreementId, address indexed by, string reason);
    event DisputeResolved(uint256 indexed agreementId, string resolution);

    mapping(uint256 => string) public disputes;

    function createAgreement(
        address tenant,
        uint256 rent,
        uint256 deposit,
        uint256 startDate,
        uint256 endDate
    ) public {
        require(startDate < endDate, "Invalid dates");

        agreementCount++;
        agreements[agreementCount] = Agreement(
            msg.sender,
            tenant,
            rent,
            deposit,
            startDate,
            endDate,
            true,
            false // depositPaid defaults to false
        );

        emit AgreementCreated(
            agreementCount,
            msg.sender,
            tenant,
            rent,
            deposit,
            startDate,
            endDate
        );
    }

    function payDeposit(uint256 agreementId) public payable {
        Agreement storage agreement = agreements[agreementId];
        require(msg.sender == agreement.tenant, "Only the tenant can pay the deposit");
        require(!agreement.depositPaid, "Deposit already paid");
        require(agreement.isActive, "Agreement is not active");
        require(msg.value == agreement.deposit, "Incorrect deposit amount");

        agreement.depositPaid = true;
        payable(agreement.landlord).transfer(msg.value);

        emit DepositPaid(agreementId, msg.sender, msg.value);
    }

    function payRent(uint256 agreementId) public payable {
        Agreement storage agreement = agreements[agreementId];
        require(msg.sender == agreement.tenant, "Only the tenant can pay rent");
        require(agreement.isActive, "Agreement is not active");
        require(msg.value == agreement.rent, "Incorrect rent amount");

        payable(agreement.landlord).transfer(msg.value);
        emit RentPaid(agreementId, msg.sender, msg.value);
    }

    function endAgreement(uint256 agreementId) public {
        Agreement storage agreement = agreements[agreementId];
        require(msg.sender == agreement.landlord, "Only the landlord can end the agreement");
        require(agreement.isActive, "Agreement is not active");

        agreement.isActive = false;

        if (agreement.depositPaid) {
            payable(agreement.tenant).transfer(agreement.deposit);
        }

        emit DepositRefunded(agreementId, agreement.tenant, agreement.deposit);
    }

    function raiseDispute(uint256 agreementId, string memory reason) public {
        Agreement storage agreement = agreements[agreementId];
        require(msg.sender == agreement.landlord || msg.sender == agreement.tenant, "Not authorized");
        require(agreement.isActive, "Agreement is not active");

        disputes[agreementId] = reason;
        emit DisputeRaised(agreementId, msg.sender, reason);
    }

    function resolveDispute(uint256 agreementId, string memory resolution) public {
        // Replace this logic with governance-based or mediation logic if needed.
        disputes[agreementId] = "";
        emit DisputeResolved(agreementId, resolution);
    }
}