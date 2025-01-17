module.exports = [
  {
    constant: false,
    inputs: [],
    name: 'flush',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'newPool', type: 'address' }],
    name: 'updateOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'poolOwner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'goToETH',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'time', type: 'uint256' },
      { indexed: true, name: 'sender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'FundsSent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'time', type: 'uint256' },
      { indexed: true, name: 'pool', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'FundsFlushed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'oldPool', type: 'address' }, { indexed: true, name: 'newPool', type: 'address' }],
    name: 'PoolChanged',
    type: 'event'
  }
]
