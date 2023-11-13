import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import "./styles.css"
import { useNavigate} from "react-router-dom"
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const navigate = useNavigate()
    const { addTransaction} = useAddTransaction()
    const { transactions , transactionTotals } = useGetTransactions()
    const [description,setDescription] = useState("")
    const [transactionAmount , setTransactionAmount] = useState(0)
    const [transactionType, setTransactionType] = useState("expense")
    const { name , profilePhoto} = useGetUserInfo()

    const { balance , income , expenses } = transactionTotals
    
    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,transactionAmount,transactionType
        })

        setDescription("")
        setTransactionAmount(0)
    }

    const signUserOut =  async () => {
        try{
            await signOut(auth)
            localStorage.clear()
            navigate("/")
        }catch(err){
            console.log(err)
        }
     
    }

    return (
    <>
    <div className="expense-tracker">
        <div className="container">
            <h1> {name}'s ExpenseTracker</h1>
            <div className="balance">
                <h3>Your balance</h3>
                {balance >=0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}

            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>${income}</p>
                </div>
                <div className="expenses">
                    <h4>Expenses</h4>
                    <p>${expenses}</p>
                </div>

            </div>
            <form className="add-transaction" onSubmit={onSubmit}>
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></input>
                <input type="number" placeholder="Amount" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} required></input>
                <input type="radio" id="expense" value="expense" checked={transactionType === 'expense'} onChange={(e) => setTransactionType(e.target.value)} ></input>

                <label htmlFor="expense">Expense</label>
                <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} ></input>
                <label htmlFor="income">Income</label>

                <button type="submit">Add Transaction</button>
            </form>
        </div>

        <div>
            {profilePhoto && 
            <div className="profile">
            <img className="profile-photo" src={profilePhoto}></img>
            <button className="sign-out-button" onClick={signUserOut}>
                SignOut
            </button>
            </div>}
        </div>
    </div>
    <div className="transactions">
        <h3>Transactions</h3>
        <ul>
           {transactions.map((transaction) => {
            const { description,transactionAmount, transactionType} = transaction;
            return (
                <li>
                    <h4>{description}</h4>
                    <p>
                        {" "}
                        ${transactionAmount} * <label style={{color : transactionType === "expense"? "red" : "green"}}>{transactionType}</label>
                    </p>
                </li>
            )
           })}
        </ul>
    </div>
    </>
    );
}