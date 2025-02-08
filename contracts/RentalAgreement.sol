// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract RentalAgreement {
    address public landlord;
    address public tenant;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public dueDate;
    bool public isActive;

    constructor(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _dueDate
    ) payable {
        require(msg.value == _securityDeposit, "Security deposit must be sent");

        landlord = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        dueDate = _dueDate;
        isActive = true;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only the tenant can call this function.");
        _;
    }

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only the landlord can call this function.");
        _;
    }

    function payRent() external payable onlyTenant {
        require(isActive, "Agreement is not active.");
        require(msg.value == rentAmount, "Incorrect rent amount.");
        require(block.timestamp <= dueDate, "Payment is overdue.");

        payable(landlord).transfer(msg.value);
    }

    function terminateAgreement() external onlyLandlord {
        isActive = false;
    }

    function refundDeposit() external onlyLandlord {
        require(!isActive, "Agreement is still active.");
        payable(tenant).transfer(securityDeposit);
    }
}

