module.exports = [
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'resolver',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'node', type: 'bytes32' }, { name: 'label', type: 'bytes32' }, { name: 'owner', type: 'address' }],
    name: 'setSubnodeOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'node', type: 'bytes32' }, { name: 'ttl', type: 'uint64' }],
    name: 'setTTL',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'node', type: 'bytes32' }],
    name: 'ttl',
    outputs: [{ name: '', type: 'uint64' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'node', type: 'bytes32' }, { name: 'resolver', type: 'address' }],
    name: 'setResolver',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'node', type: 'bytes32' }, { name: 'owner', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'node', type: 'bytes32' },
      { indexed: true, name: 'label', type: 'bytes32' },
      { indexed: false, name: 'owner', type: 'address' }
    ],
    name: 'NewOwner',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'node', type: 'bytes32' }, { indexed: false, name: 'owner', type: 'address' }],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'node', type: 'bytes32' }, { indexed: false, name: 'resolver', type: 'address' }],
    name: 'NewResolver',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'node', type: 'bytes32' }, { indexed: false, name: 'ttl', type: 'uint64' }],
    name: 'NewTTL',
    type: 'event'
  }
]
