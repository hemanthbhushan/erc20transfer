// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20,Ownable {
  

     constructor() ERC20("TestToken","TK"){
        _mint(msg.sender, 1000000000000000000);

    }

    function mintToken(address account,uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
    function burnToken(address account,uint256 amount) external onlyOwner {
        _burn(account, amount);
    }





}
