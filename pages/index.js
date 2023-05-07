import { useState,useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { fetchAllQuotes } from "./reducers/fetchAllQuotesSlice";
import { fetchRandomQuote } from "./reducers/fetchRandomQuoteSlice";
import {motion} from 'framer-motion'
import Date from './date';
const quotesProvider = require("../supabase");
const quotesGetter = quotesProvider.from("quotes");
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Homepage.module.css';





export default function Homepage(){
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    let href = `https://twitter.com/intent/tweet?text=`
    const [allQuotes, setAllQuotes] = useState(true);
    const [formData, setFormData] = useState( { author: '', quote: ''})
    const [array, setArray] = useState([])
    const [singleQuote, setSingleQuote]  = useState(false);
    const quotes = useSelector((state)=> state.quotes);
    const randomQuote = useSelector((state)=> state.singleQuote.singleQuote);
  
    const handleDelete = async (quoteId) => {
     const {error} = await quotesGetter.delete().eq('id', quoteId);
     let x = array.filter((item) => item.id !== quoteId);
     if(error) throw Error
    
     setShowDelete(true);
     setTimeout(()=>{
        const myBtn = document.getElementById('deleteButton');
         myBtn.style.display = 'inline'
         setShowDelete(false);
         setArray(x);
 }, 2000)
 
    }
  
  
    const handleChange = (event) => {
        const { name, value, id } = event.target;
        setFormData((prevState)=> ({...prevState, [name]: value, id}))
    }
    const handleSubmit = async (event) =>{
      event.preventDefault();
      const { data,error } = await quotesGetter
      .update({ author: formData.author, quote: formData.quote })
      .eq('id', formData.id)
      .select()
      if(error) throw Error
      setShowForm(false);
      setShowPopup(true);
      
      setTimeout(()=>{
             const myBtn = document.getElementById('editButton');
              myBtn.style.display = 'inline'
              setShowPopup(false);
              setArray(data)
      }, 2000)
      
  
  }
  
  
  useEffect(()=>{
    dispatch(fetchAllQuotes());
    setArray(quotes.quotes);
  },[allQuotes])
  useEffect(()=>{
    dispatch(fetchRandomQuote());
    setArray(randomQuote)
  },[singleQuote])
  



    return(
        <div className={styles.container}>
        <Head>
        <title>CodeCademy Quotes App</title>
        <meta name='description' content='CRUD App With Next.js'/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&display=swap" rel="stylesheet"/>
       </Head>
        <div className={styles.header}>
        <h3>Quotes App</h3>
        <h6>Create, Edit, Search and Share your favourite quotes!</h6>
        </div>
            <ul className={styles.navlist}>
            <button className="waves-effect waves-light btn"><Link href='addQuote'>Add New Quote</Link></button>
            <button className="waves-effect waves-light btn"><Link href='searchAuthor'>Search Author</Link></button>
            </ul>
            <div className={styles.quotes}>
        <div className={styles.fetch}>
          <button className="waves-effect waves-light btn red" onClick={()=> {allQuotes ? setAllQuotes(false) : setAllQuotes(true)}}>Fetch All Quotes</button>
          <button className="waves-effect waves-light btn red"onClick={()=> {singleQuote ? setSingleQuote(false) : setSingleQuote(true)}}>Fetch Random Quote</button>
          </div>
          {

<div >
     {array.map((quote) => (
       <div className={styles.quote}  key={quote.id}>
                   <motion.div
            initial={{opacity:0, scale: 0.25}}
              animate={{opacity : 1, scale: 1 }}
              transition={{duration:1}}
            >
        <div className={styles.format} >
                <p><i className='material-icons'>format_quote</i><em>{quote.quote}</em></p>
                <p><b>{quote.author}</b></p></div>
      {quote.updated_at !== null ? <p>Updated at:  <Date dateString={quote.updated_at}/></p> : <p>Created at: <Date dateString={quote.created_at} /></p>}
        <div className={styles.none}>{    href+= encodeURIComponent('"' + quote.quote + '"- ' + quote.author)}</div>
       <button id='editButton' className="btn waves-effect waves-light black" onClick={()=> {
         setShowForm(true);
         const myBtn = document.getElementById('editButton');
         myBtn.style.display = 'none'
         setFormData((prevState)=> ({...prevState, 'author': quote.author, 'quote' : quote.quote, 'id' : quote.id}))
         }}><i className="material-icons">create</i>
         </button>
         <a target='_blank' href={href} className={styles.share}><i className="author-icon material-icons">share</i></a>
       {showForm && (
                           <motion.div
                           initial={{opacity:0, scale: 0.25}}
                             animate={{opacity : 1, scale: 1 }}
                             transition={{duration:0.5}}
                           >
         <form onSubmit={handleSubmit}>
             <label htmlFor="Author">Author: </label>
             <input type='text' name='author' id={quote.id} defaultValue={quote.author} onChange={handleChange} />
             <label htmlFor="Quote">Quote:</label>
             <input type='text' name='quote' defaultValue={quote.quote} onChange={handleChange} />  
             <button className="btn waves-effect waves-light black" type="submit" name="action">
    <i className="material-icons">send</i>
  </button>          </form>
  </motion.div>
     )}

       <button id='deleteButton' className="btn waves-effect waves-light black" onClick={()=> {
          handleDelete(quote.id);
          const myBtn = document.getElementById('deleteButton');
          myBtn.style.display = 'none'
                    
         }}><i className="material-icons">delete</i>
         </button>
         {showPopup && (
            <div className={styles.popup}>
                <p>Quote Edited Successfully.</p>
                </div>
        )}
                 {showDelete && (
            <div className={styles.popup}>
                <p>Quote Deleted Successfully.</p>
                </div>
        )}
        </motion.div>
       </div>
       

     ))}
     </div> 
  }
          </div>
        </div>
    )
}