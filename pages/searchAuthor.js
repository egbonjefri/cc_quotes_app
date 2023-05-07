import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/SearchAuthor.module.css';
const quotesProvider = require("../supabase");
const quotesGetter = quotesProvider.from("quotes");
import { useState } from 'react'
import {motion} from 'framer-motion'



export default function SearchAuthor() {
    const [array, setArray] = useState([]);
    const [formData, setFormData] = useState( { author: ''})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({[name]: value})
    }
    async function handleSubmit(event){
        event.preventDefault()
        const { data, error } = await quotesGetter.select('*').eq('author', formData.author);
        if(error || data.length === 0) {
            setArray([{quote:'', author: 'Sorry no Authors by that name, please try again...'}])
            throw Error}
        else{
            setArray(data)
        }

    }
    return (
        <div className={styles.container}>
        <Head>
        <title>Search Quotes by Author</title>
        <meta name='description' content='CRUD App With Next.js'/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        </Head>
        <h3 className={styles.header}>Search Quotes</h3>
            <form className={styles.myform} onSubmit={handleSubmit} >
            <input name='author' onChange={handleChange} placeholder='Enter Name of Author' />
        <button className="btn waves-effect waves-light red" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
  </button>        
            </form>
            <div >
     {array.map((quote) => (
       <div className={styles.quote}  key={quote.id}>
                   <motion.div
            initial={{opacity:0, scale: 0.25}}
              animate={{opacity : 1, scale: 1 }}
              transition={{duration:1}}
            ></motion.div>
             <div className={styles.format} >
                <p><i className='material-icons'>format_quote</i><em>{quote.quote}</em></p>
                <p><b>{quote.author}</b></p></div>
            </div>
            ))}
            </div>
        <button  className="btn waves-effect waves-light black"><Link href='/'>    <i className="material-icons">navigate_before</i>
</Link></button>

        </div>
    )
}