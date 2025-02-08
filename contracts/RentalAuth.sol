// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAuth {
    mapping(address => bool) public verifiedUsers;

    event UserVerified(address indexed anonID);

    function verifyUser(address anonID) public {
        require(!verifiedUsers[anonID], "User already registered");
        verifiedUsers[anonID] = true;
        emit UserVerified(anonID);
    }


    function isUserVerified(address anonID) public view returns (bool) {
        return verifiedUsers[anonID];

    

    
    }
}
