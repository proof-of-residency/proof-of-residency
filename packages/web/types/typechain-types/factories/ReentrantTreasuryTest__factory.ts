/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ReentrantTreasuryTest,
  ReentrantTreasuryTestInterface,
} from "../ReentrantTreasuryTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "victim",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [],
    name: "HitFallback",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161015738038061015783398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b60c5806100926000396000f3fe608060405236608a576040517f7d5cd9daf528e533ba8cae574873331c202235d7f9a7748ed50410618a9544b090600090a16000805460408051633ccfd60b60e01b815290516001600160a01b0390921692633ccfd60b9260048084019382900301818387803b158015607157600080fd5b505af11580156084573d6000803e3d6000fd5b50505050005b600080fdfea2646970667358221220f471734791a63aa0e42b15479e268e1433e37a5dabb81fad42c9a50a152e06da64736f6c63430008070033";

type ReentrantTreasuryTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReentrantTreasuryTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReentrantTreasuryTest__factory extends ContractFactory {
  constructor(...args: ReentrantTreasuryTestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ReentrantTreasuryTest";
  }

  deploy(
    victim: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReentrantTreasuryTest> {
    return super.deploy(
      victim,
      overrides || {}
    ) as Promise<ReentrantTreasuryTest>;
  }
  getDeployTransaction(
    victim: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(victim, overrides || {});
  }
  attach(address: string): ReentrantTreasuryTest {
    return super.attach(address) as ReentrantTreasuryTest;
  }
  connect(signer: Signer): ReentrantTreasuryTest__factory {
    return super.connect(signer) as ReentrantTreasuryTest__factory;
  }
  static readonly contractName: "ReentrantTreasuryTest";
  public readonly contractName: "ReentrantTreasuryTest";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReentrantTreasuryTestInterface {
    return new utils.Interface(_abi) as ReentrantTreasuryTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReentrantTreasuryTest {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ReentrantTreasuryTest;
  }
}
