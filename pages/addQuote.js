import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/AddQuote.module.css';
const quotesProvider = require("../supabase");
const quotesGetter = quotesProvider.from("quotes");
import { useState } from 'react'



export default function AddQuote(){
    const [showPopup, setShowPopup] = useState(false)
    const [formData, setFormData] = useState( { author: '', quote: ''})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState)=> ({...prevState, [name]: value}))
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const { data, error } = await quotesGetter.insert([{
            author: formData.author, quote: formData.quote
        }]);
        if(error) throw Error
        else{
            setShowPopup(true);
            setFormData({ author: '', quote: ''})
            
            setTimeout(()=>{
                    setShowPopup(false);
            }, 2000)

           
        }
    }


    return (
        <div className={styles.container}>
        <Head>
        <title>Add New Quote</title>
        <meta name='description' content='CRUD App With Next.js'/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        </Head>
        <h3 className={styles.header}>Add a New Quote</h3>
            <form className={styles.myform} onSubmit={handleSubmit}>
                <label htmlFor="Author">Author: </label>
                <input type='text' name='author' value={formData.author} onChange={handleChange} />
                <label htmlFor="Quote">Quote:</label>
                <textarea type='text' name='quote' value={formData.quote} onChange={handleChange} />  
                <button className="btn waves-effect waves-light red" type="submit" name="action">
    <i className="material-icons">send</i>
  </button> 
            </form>
        {showPopup && (
            <div className={styles.popup}>
                <p>Quote Submitted Successfully.</p>
                </div>
        )}
        <button  className="btn waves-effect waves-light black"><Link href='/'>    <i className="material-icons">navigate_before</i>
</Link></button>
        </div>
    )
}