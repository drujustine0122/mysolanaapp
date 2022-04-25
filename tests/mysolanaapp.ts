import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Mysolanaapp } from "../target/types/mysolanaapp";

describe("mysolanaapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  let _baseAccount = anchor.web3.Keypair.generate();
  const SystemProgram = anchor.web3.SystemProgram;
  it("Create a counter", async () => {
    
    const baseAccount = anchor.web3.Keypair.generate();
    
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Count 0: ', account.count.toString())
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("increments the counter", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Count 1", account.count.toString());
    assert.ok(account.count.toString() == 1);
  });
  
});
