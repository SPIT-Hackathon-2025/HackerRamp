// RentalAuth.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAuth {
    mapping(address => bool) public verifiedUsers;
    mapping(string => address) private aadhaarToAnon;

    event UserVerified(address indexed anonID);

    function verifyUser(address anonID) public {
        require(!verifiedUsers[anonID], "User already verified");
        verifiedUsers[anonID] = true;
        emit UserVerified(anonID);
    }

    function registerAadhaar(string memory aadhaarHash, address anonID) public {
        require(!verifiedUsers[anonID], "Anonymous ID already registered");
        require(aadhaarToAnon[aadhaarHash] == address(0), "Aadhaar already registered");
        
        aadhaarToAnon[aadhaarHash] = anonID;
        verifiedUsers[anonID] = true;
        emit UserVerified(anonID);
    }

    function isUserVerified(address anonID) public view returns (bool) {
        return verifiedUsers[anonID];
    }

    function getAnonymousID(string memory aadhaarHash) public view returns (address) {
        return aadhaarToAnon[aadhaarHash];
    }
}
