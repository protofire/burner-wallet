module.exports = [
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'addWhitelisted',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_vendorAddress', type: 'address' }, { name: '_name', type: 'bytes32' }],
    name: 'addVendor',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'removeAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'isAdmin',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'vendors',
    outputs: [
      { name: 'name', type: 'bytes32' },
      { name: 'isActive', type: 'bool' },
      { name: 'isAllowed', type: 'bool' },
      { name: 'exists', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'removeWhitelisted',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'superAdmin',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_vendorAddress', type: 'address' },
      { name: '_name', type: 'bytes32' },
      { name: '_isActive', type: 'bool' },
      { name: '_isAllowed', type: 'bool' }
    ],
    name: 'updateVendor',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'tokenContract',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'addAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'id', type: 'uint256' },
      { name: 'name', type: 'bytes32' },
      { name: 'cost', type: 'uint256' },
      { name: 'isAvailable', type: 'bool' }
    ],
    name: 'addProduct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: '_isActive', type: 'bool' }],
    name: 'activateVendor',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'sweep',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceWhitelisted',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'isSuperAdmin',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'adminMint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'addAllowance',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }],
    name: 'products',
    outputs: [
      { name: 'id', type: 'uint256' },
      { name: 'cost', type: 'uint256' },
      { name: 'name', type: 'bytes32' },
      { name: 'exists', type: 'bool' },
      { name: 'isAvailable', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '_tokenContract', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'depositor', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'withdrawer', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'vendor', type: 'address' },
      { indexed: false, name: 'name', type: 'bytes32' },
      { indexed: false, name: 'isActive', type: 'bool' },
      { indexed: false, name: 'isAllowed', type: 'bool' },
      { indexed: false, name: 'sender', type: 'address' }
    ],
    name: 'UpdateVendor',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'vendor', type: 'address' },
      { indexed: false, name: 'id', type: 'uint256' },
      { indexed: false, name: 'cost', type: 'uint256' },
      { indexed: false, name: 'name', type: 'bytes32' },
      { indexed: false, name: 'isAvailable', type: 'bool' }
    ],
    name: 'AddProduct',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'WhitelistedAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'WhitelistedRemoved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'AdminAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'account', type: 'address' }],
    name: 'AdminRemoved',
    type: 'event'
  }
]
