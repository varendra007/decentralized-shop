// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract payment{

  
    address payable owner; //owner is going to receive funds
    constructor(){
        owner = payable(msg.sender);
    }

    function buyItem() external payable{
        require(msg.value>0,"Please pay more than 0 ether");
        uint256 balance = address(msg.sender).balance;
        uint256 balanceInEther = balance / 1 ether;
        require(balanceInEther > msg.value,"Please pay more than 0 ether");
        owner.transfer(msg.value);
    }

    
}