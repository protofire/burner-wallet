module.exports = [
  {
    constant: true,
    inputs: [
      { name: '_id', type: 'bytes32' },
      { name: '_signature', type: 'bytes' },
      { name: '_claimHash', type: 'bytes32' },
      { name: '_destination', type: 'address' }
    ],
    name: 'isClaimValid',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_operator', type: 'address' },
      { name: '_from', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
      { name: '_data', type: 'bytes' }
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', type: 'bytes4' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'bytes32' }],
    name: 'funds',
    outputs: [
      { name: 'sender', type: 'address' },
      { name: 'signer', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'msgVal', type: 'uint256' },
      { name: 'nonce', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_id', type: 'bytes32' },
      { name: '_signature', type: 'bytes' },
      { name: '_token', type: 'address' },
      { name: '_tokenId', type: 'uint256' }
    ],
    name: 'send',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_id', type: 'bytes32' }],
    name: 'isFundValid',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'bytes32' }],
    name: 'nonceId',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_token', type: 'address' }, { name: '_from', type: 'address' }],
    name: 'balance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_id', type: 'bytes32' },
      { name: '_signature', type: 'bytes' },
      { name: '_claimHash', type: 'bytes32' },
      { name: '_destination', type: 'address' }
    ],
    name: 'claim',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { payable: false, stateMutability: 'nonpayable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'id', type: 'bytes32' },
      { indexed: true, name: 'sender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: false, name: 'nonce', type: 'uint256' },
      { indexed: true, name: 'sent', type: 'bool' }
    ],
    name: 'Sent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'id', type: 'bytes32' },
      { indexed: false, name: 'sender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: true, name: 'receiver', type: 'address' },
      { indexed: false, name: 'nonce', type: 'uint256' },
      { indexed: true, name: 'claimed', type: 'bool' }
    ],
    name: 'Claimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'tokenId', type: 'uint256' },
      { indexed: false, name: 'status', type: 'bool' }
    ],
    name: 'VaultTransfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'token', type: 'address' },
      { indexed: true, name: 'sender', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'tokenId', type: 'uint256' },
      { indexed: false, name: 'status', type: 'bool' }
    ],
    name: 'VaultDeposit',
    type: 'event'
  }
]
