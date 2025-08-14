# ZetaChain Uniflow Cross-Chain Stable Pool

A cross-chain stable pool implementation based on Balancer v3 architecture, designed for ZetaChain's omnichain environment.

## Project Overview

This project implements a cross-chain stable pool system that allows for seamless token swaps and liquidity provision across different blockchains using ZetaChain's universal contract capabilities.

## Architecture

### Core Components

- **Vault System**: Core liquidity management and pool operations
- **Router System**: User-facing interfaces for swaps and liquidity operations
- **Stable Pool**: AMM implementation with stable swap curve for pegged assets
- **Cross-Chain Integration**: ZetaChain universal contracts for omnichain functionality

## Balancer v3 to Project Mapping

### 🏗️ Core Vault System
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `vault/contracts/Vault.sol` | `contracts/Vault.sol` | ✅ Implemented | Core vault implementation |
| `vault/contracts/VaultExtension.sol` | `contracts/VaultExtension.sol` | ✅ Implemented | Extended vault functionality |
| `vault/contracts/VaultAdmin.sol` | `contracts/VaultAdmin.sol` | ✅ Implemented | Administrative functions |
| `vault/contracts/ProtocolFeeController.sol` | `contracts/ProtocolFeeController.sol` | ✅ Implemented | Protocol fee management |

### 🌉 Router System
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `vault/contracts/Router.sol` | `contracts/Router.sol` | ✅ Implemented | Main user interface router |
| `vault/contracts/BatchRouter.sol` | *Not implemented* | ❌ Planned | Batch operation routing |
| `vault/contracts/BufferRouter.sol` | *Not implemented* | ❌ Planned | Buffer management routing |

### 🏊 Pool Implementations
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `pool-stable/contracts/StablePool.sol` | `contracts/StablePool.sol` | ✅ Implemented | Stable swap AMM implementation |
| `pool-stable/contracts/StablePoolFactory.sol` | `contracts/common/StablePoolFactory.sol` | ✅ Implemented | Stable pool factory |
| `pool-weighted/contracts/WeightedPool.sol` | *Not implemented* | ❌ Future | Weighted pool implementation |
| `pool-weighted/contracts/WeightedPoolFactory.sol` | *Not implemented* | ❌ Future | Weighted pool factory |

### 🔧 Common Components & Authentication
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `pool-utils/contracts/BasePoolAuthentication.sol` | `contracts/common/BasePoolAuthentication.sol` | ✅ Implemented | Pool authentication base |
| `pool-utils/contracts/BasePoolFactory.sol` | `contracts/common/BasePoolFactory.sol` | ✅ Implemented | Pool factory base |
| `pool-utils/contracts/PoolInfo.sol` | `contracts/common/PoolInfo.sol` | ✅ Implemented | Pool information utilities |
| `solidity-utils/contracts/helpers/Authentication.sol` | `contracts/common/Authentication.sol` | ✅ Implemented | Base authentication |
| `solidity-utils/contracts/helpers/Version.sol` | `contracts/common/Version.sol` | ✅ Implemented | Version management |

### 📚 Mathematical Libraries
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `solidity-utils/contracts/math/StableMath.sol` | `contracts/libs/StableMath.sol` | ✅ Implemented | Stable swap mathematics |
| `solidity-utils/contracts/math/FixedPoint.sol` | `contracts/libs/FixedPoint.sol` | ✅ Implemented | Fixed-point arithmetic |
| `solidity-utils/contracts/math/LogExpMath.sol` | `contracts/libs/LogExpMath.sol` | ✅ Implemented | Logarithmic/exponential math |
| `solidity-utils/contracts/math/WeightedMath.sol` | *Not implemented* | ❌ Future | Weighted pool mathematics |

### 🛠️ Utility Libraries
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `solidity-utils/contracts/helpers/WordCodec.sol` | `contracts/libs/WordCodec.sol` | ✅ Implemented | Bit packing utilities |
| `solidity-utils/contracts/helpers/PackedTokenBalance.sol` | `contracts/libs/PackedTokenBalance.sol` | ✅ Implemented | Token balance packing |
| `solidity-utils/contracts/helpers/ScalingHelpers.sol` | `contracts/libs/ScalingHelpers.sol` | ✅ Implemented | Token scaling utilities |
| `solidity-utils/contracts/helpers/InputHelpers.sol` | `contracts/libs/InputHelpers.sol` | ✅ Implemented | Input validation helpers |
| `solidity-utils/contracts/helpers/CastingHelpers.sol` | `contracts/libs/CastingHelpers.sol` | ✅ Implemented | Type casting utilities |
| `solidity-utils/contracts/helpers/BufferHelpers.sol` | `contracts/libs/BufferHelpers.sol` | ✅ Implemented | Buffer management utilities |

### 🏪 Storage & Data Management
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `solidity-utils/contracts/helpers/TransientStorageHelpers.sol` | `contracts/libs/TransientStorageHelpers.sol` | ✅ Implemented | Transient storage utilities |
| `solidity-utils/contracts/openzeppelin/TransientEnumerableSet.sol` | `contracts/libs/TransientEnumerableSet.sol` | ✅ Implemented | Transient enumerable sets |
| `solidity-utils/contracts/openzeppelin/StorageSlotExtension.sol` | `contracts/libs/StorageSlotExtension.sol` | ✅ Implemented | Storage slot extensions |
| `solidity-utils/contracts/openzeppelin/SlotDerivation.sol` | `contracts/libs/SlotDerivation.sol` | ✅ Implemented | Storage slot derivation |

### 🔗 Advanced Utilities
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `solidity-utils/contracts/solmate/Bytes32AddressLib.sol` | `contracts/libs/Bytes32AddressLib.sol` | ✅ Implemented | Address/bytes32 conversion |
| `solidity-utils/contracts/solmate/CREATE3.sol` | `contracts/libs/CREATE3.sol` | ✅ Implemented | Deterministic deployment |
| `solidity-utils/contracts/helpers/CodeDeployer.sol` | `contracts/libs/CodeDeployer.sol` | ✅ Implemented | Contract deployment utilities |
| `solidity-utils/contracts/helpers/RevertCodec.sol` | `contracts/libs/RevertCodec.sol` | ✅ Implemented | Revert reason encoding |

### 🔌 Interfaces
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `interfaces/contracts/vault/IVault.sol` | `contracts/interfaces/IVault.sol` | ✅ Implemented | Core vault interface |
| `interfaces/contracts/vault/IVaultAdmin.sol` | `contracts/interfaces/IVaultAdmin.sol` | ✅ Implemented | Vault admin interface |
| `interfaces/contracts/vault/IVaultExtension.sol` | `contracts/interfaces/IVaultExtension.sol` | ✅ Implemented | Vault extension interface |
| `interfaces/contracts/vault/IRouter.sol` | `contracts/interfaces/IRouter.sol` | ✅ Implemented | Router interface |
| `interfaces/contracts/vault/IProtocolFeeController.sol` | `contracts/interfaces/IProtocolFeeController.sol` | ✅ Implemented | Protocol fee controller interface |
| `interfaces/contracts/pool-stable/IStablePool.sol` | `contracts/interfaces/IStablePool.sol` | ✅ Implemented | Stable pool interface |

### 🧪 Testing Infrastructure
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `vault/test/foundry/` | `test/foundry/` | ✅ Implemented | Foundry test infrastructure |
| `pool-stable/test/` | `test/unit/` | ✅ Implemented | Unit tests for pools |
| `vault/test/gas/` | *Not implemented* | ❌ Planned | Gas benchmarking tests |
| `solidity-utils/test/` | `test/libs/` | ❌ Planned | Library-specific tests |

### � Mock Contracts
| Balancer v3 | Current Project | Status | Purpose |
|-------------|-----------------|--------|---------|
| `solidity-utils/contracts/test/ERC20TestToken.sol` | `contracts/test/TestToken.sol` | ✅ Implemented | Test ERC20 token |
| `solidity-utils/contracts/test/WETHTestToken.sol` | `contracts/mocks/MockWETH9.sol` | ✅ Implemented | Mock WETH implementation |
| Various test mocks | `contracts/mocks/MockERC20.sol` | ✅ Implemented | General ERC20 mock |

### �🚀 Cross-Chain Extensions (Unique to This Project)
| Component | File | Status | Purpose |
|-----------|------|--------|---------|
| Universal Contracts | *ZetaChain integration* | 🔄 In Progress | ZetaChain omnichain base contracts |
| Cross-Chain Router | *Extended Router functionality* | 🔄 In Progress | Cross-chain operation routing |
| Gateway Integration | *Router gateway functions* | 🔄 In Progress | ZetaChain gateway connectivity |
| Chain Connectors | *Not implemented* | ❌ Planned | Multi-blockchain integrations |

### 📊 Implementation Status Summary
- ✅ **Core Vault System**: Fully implemented (4/4)
- ✅ **Mathematical Libraries**: Stable math implemented (3/4)
- ✅ **Utility Libraries**: Comprehensive implementation (10/10)
- ✅ **Interfaces**: Core interfaces implemented (6/6)
- 🔄 **Router System**: Basic implementation (1/3)
- 🔄 **Pool Implementations**: Stable pools only (1/2)
- ❌ **Advanced Features**: Planned for future releases
- 🔄 **Cross-Chain**: ZetaChain integration in progress

### 🎯 Key Differences from Balancer v3
1. **Cross-Chain Focus**: Enhanced with ZetaChain universal contract capabilities
2. **Simplified Pool Types**: Initially focusing on stable pools only
3. **Custom Router**: Extended with cross-chain functionality
4. **Optimized Libraries**: Streamlined for cross-chain operations
5. **ZetaChain Integration**: Native support for omnichain functionality

## Project Structure

```
├── contracts/                 # Smart contracts
│   ├── vault/                 # Core vault system
│   ├── pools/                 # Pool implementations
│   ├── routers/              # User interfaces
│   ├── cross-chain/          # ZetaChain integrations
│   └── libraries/            # Shared utilities
├── test/                     # Test suites
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── foundry/             # Foundry tests
├── scripts/                  # Deployment scripts
└── docs/                    # Documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Foundry
- Hardhat

### Installation

```bash
npm install
```

### Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `PRIVATE_KEY`: Deployer private key
- `RPC_URL`: Blockchain RPC endpoint
- `ETHERSCAN_API_KEY`: For contract verification

### Build

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Run Foundry tests
npm run test:foundry
```

### Deployment

```bash
# Deploy to testnet
npm run deploy:testnet

# Deploy to mainnet
npm run deploy:mainnet
```

## Core Features

### ⚖️ Stable Pool AMM
- **Low Slippage**: Optimized for assets with similar values
- **Dynamic Fees**: Adjustable swap fees based on pool conditions
- **Amplification**: Configurable amplification parameter for curve steepness

### 🌍 Cross-Chain Operations
- **Omnichain Swaps**: Swap tokens across different blockchains
- **Cross-Chain Liquidity**: Provide liquidity from any supported chain
- **Unified Pool State**: Single pool state across all chains

### 💰 Liquidity Management
- **Proportional Addition**: Add liquidity in proportion to pool composition
- **Single-Token Addition**: Add liquidity with a single token
- **Flexible Removal**: Remove liquidity proportionally or as specific tokens

### 🔐 Security Features
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Access Control**: Role-based permissions system
- **Pause Mechanism**: Emergency pause functionality

## API Reference

### Pool Operations

```solidity
// Initialize pool with initial liquidity
function initialize(
    address pool,
    address[] tokens,
    uint256[] amounts,
    uint256 minBptOut
) external returns (uint256 bptOut);

// Add liquidity proportionally
function addLiquidityProportional(
    address pool,
    uint256[] maxAmountsIn,
    uint256 exactBptOut
) external returns (uint256[] amountsIn);

// Swap tokens
function swapSingleTokenExactIn(
    address pool,
    address tokenIn,
    address tokenOut,
    uint256 exactAmountIn,
    uint256 minAmountOut
) external returns (uint256 amountOut);
```

### Cross-Chain Operations

```solidity
// Cross-chain swap
function crossChainSwap(
    uint256 destinationChainId,
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minAmountOut,
    address recipient
) external payable;

// Add cross-chain liquidity
function addCrossChainLiquidity(
    uint256 destinationChainId,
    address pool,
    address token,
    uint256 amount
) external payable;
```

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### Gas Benchmarks
```bash
npm run test:gas
```

### Coverage
```bash
npm run coverage
```

## Deployment Addresses

### Testnet (Athens)
- Vault: `0x...`
- Router: `0x...`
- StablePool Factory: `0x...`

### Mainnet (ZetaChain)
- Vault: `0x...`
- Router: `0x...`
- StablePool Factory: `0x...`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Code Style

- Follow Solidity style guide
- Use meaningful variable names
- Add comprehensive comments
- Include tests for new features

## Security

### Audits
- [ ] Internal security review
- [ ] External audit (pending)
- [ ] Bug bounty program (planned)

### Bug Reports
Please report security vulnerabilities to: security@zetachain.com

## Documentation

- [Architecture Overview](./docs/architecture.md)
- [Cross-Chain Guide](./docs/cross-chain.md)
- [Integration Examples](./docs/examples.md)
- [API Reference](./docs/api.md)

## Monitoring

### Health Check
```bash
GET /api/health

Response:
{
  "status": "ok",
  "version": "v1.0.0",
  "network": "zetachain-mainnet",
  "blockNumber": 1234567,
  "poolCount": 42,
  "totalValueLocked": "1000000000000000000000"
}
```

### Metrics
- Pool utilization rates
- Cross-chain transaction volumes
- Gas usage statistics
- Error rates and response times

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Support

- Documentation: [docs.zetachain.com](https://docs.zetachain.com)
- Discord: [ZetaChain Community](https://discord.gg/zetachain)
- Twitter: [@zetachain](https://twitter.com/zetachain)
- Email: support@zetachain.com
