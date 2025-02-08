// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAgreement {
    address public landlord;
    address public tenant;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public dueDate;

    event AgreementSigned(address indexed tenant, uint256 rentAmount, uint256 securityDeposit, uint256 dueDate);
    event RentPaid(address indexed tenant, uint256 amount);
    event AgreementTerminated(address indexed tenant);

    constructor(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _dueDate
    ) payable {
        require(msg.value == _securityDeposit, "Security deposit required");
        landlord = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        dueDate = _dueDate;

        emit AgreementSigned(_tenant, _rentAmount, _securityDeposit, _dueDate);
    }

    function payRent() public payable {
        require(msg.sender == tenant, "Only tenant can pay rent");
        require(msg.value == rentAmount, "Incorrect rent amount");
        payable(landlord).transfer(msg.value);
        emit RentPaid(tenant, msg.value);
    }

    function terminateAgreement() public {
        require(msg.sender == landlord || msg.sender == tenant, "Only landlord or tenant can terminate");
        payable(tenant).transfer(securityDeposit);
        emit AgreementTerminated(tenant);
    }
}
