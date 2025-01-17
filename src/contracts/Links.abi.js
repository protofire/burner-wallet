module.exports = [
  {
    constant: true,
    inputs: [],
    name: 'get_hub_addr',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
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
    constant: false,
    inputs: [{ name: 'rhub', type: 'address' }],
    name: 'set_hub',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'blockLog',
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
      { name: '_token', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_expirationDays', type: 'uint256' }
    ],
    name: 'send',
    outputs: [{ name: '', type: 'bool' }],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'methodSig', type: 'string' }],
    name: 'sig',
    outputs: [{ name: '', type: 'bytes4' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
      { name: '', type: 'bytes' },
      { name: '', type: 'bool' },
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' }
    ],
    name: 'post_relayed_call',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
      { name: 'encoded_function', type: 'bytes' },
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' }
    ],
    name: 'accept_relayed_call',
    outputs: [{ name: '', type: 'uint32' }],
    payable: false,
    stateMutability: 'view',
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
      { name: 'amount', type: 'uint256' },
      { name: 'msgVal', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'creationTime', type: 'uint256' },
      { name: 'expirationTime', type: 'uint256' },
      { name: 'claimed', type: 'bool' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'source', type: 'bytes' }, { name: 'ofs', type: 'uint256' }],
    name: 'extractUint',
    outputs: [{ name: 'result', type: 'uint256' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'msg_data', type: 'bytes' }],
    name: 'getMethodSig',
    outputs: [{ name: '', type: 'bytes4' }],
    payable: false,
    stateMutability: 'pure',
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
    inputs: [],
    name: 'get_message_data',
    outputs: [{ name: '', type: 'bytes' }],
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
    inputs: [{ name: 'source', type: 'bytes' }, { name: 'ofs', type: 'uint256' }, { name: 'len', type: 'uint256' }],
    name: 'extractBytes',
    outputs: [{ name: 'ret', type: 'bytes' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit_to_relay_hub',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'get_sender',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'msg_data', type: 'bytes' }, { name: 'index', type: 'uint256' }],
    name: 'getStringParam',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'pure',
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
    constant: true,
    inputs: [{ name: 'orig_sender', type: 'address' }, { name: 'msg_data', type: 'bytes' }],
    name: 'get_sender_from_data',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'msg_data', type: 'bytes' }, { name: 'index', type: 'uint256' }],
    name: 'getParam',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_id', type: 'bytes32' }],
    name: 'isClaimExpired',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: 'msg_data', type: 'bytes' }, { name: 'index', type: 'uint256' }],
    name: 'getBytesParam',
    outputs: [{ name: 'ret', type: 'bytes' }],
    payable: false,
    stateMutability: 'pure',
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
  {
    constant: true,
    inputs: [],
    name: 'get_recipient_balance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
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
      { indexed: false, name: 'sent', type: 'bool' },
      { indexed: true, name: 'previousBlock', type: 'uint256' }
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
