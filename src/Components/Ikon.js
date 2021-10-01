import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import { CodeBlock, dracula } from "react-code-blocks";

const useStyles = makeStyles(theme => ({
    main_paper: {
        marginTop: '7%',
        marginLeft: '7%',
        marginRight: '7%',
        marginBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    nav_wrap: {
        fontSize: '12px',
        fontFamily: 'opensans-bold, sans-serif',
        width: '100%',
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        margin: 0,
        zIndex: 100,
        position: 'fixed',
        left: 0,
        top: 0,
    },
    para_text: {
        fontSize: '18px',
        fontFamily: 'librebaskerville-regular, serif',
        lineHeight: '2'
        // whiteSpace: 'pre-wrap'
    }
  }));

const Ikon = () => {

    const classes = useStyles();

    const para1 = `As the 2020-2021 ski season started to roll around, it was clear that the global pandemic was not going away and the ski industry was going to be
    affected. Like many other mountains on the Ikon pass system, my Seattle home mountain opted in for a ticket reservation system. Unsurprisingly thought, all of the
    weekend reservations were immediately snatched up by those with good internet speeds and a little bit of luck as soon as the system launched. To claim a spot,
    you had to frustratingly refresh the reservation page and re-fill out the form to even see if there was a spot that someone had dropped. Sometimes
    this could take hours to get one of those coveted weekend days when the forcast was looking "rad". This went on for several weeks..`

    const para2 = `I first want to start by saying that I did not exploit anything. I just wanted to get reservations without actually having to be present at my computer.
    Is that too much to ask?!`

    const para3 = `I needed tool to be able to go through all the user input motions for logging in to the Ikon website, filling out the reservation form, and checking
    for avaliability. If no reservation was avaliable, it would need to refresh and try again. If there was a reservation avaliable, it would need to book that
    bad boy. If you read the write-up on my MathPrepPro Webapp then you know I already used a webdriver to automate out some tasks. Just having learned about
    how to use one at the time, it were a perfect tool for the job. Beause I primarily use Chrome, the Selenium webdriver was used.`

    const para4 = `I little inpsection of the Ikon website HTML code gave me all of the element data I needed to hardcode in the clicks and user input fields.
    Some experimenting with the website server response / load times led me to build in just enough buffer time to make sure everything rendered before web
    driving. I even created an executable file so I could quickly launch the tool when needed. Check out the raw code below.`

    const para5 = `This is probably my favorite piece of software that I have written so far. It saved me more time throughout the 20-21 ski season than what
    it took to develop by almost an order of magnitude! Many times I was able to start the script and run some errnds knowing I'd likely come back to
    a weekend reservation.`

    const code = `from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import getpass
import time
    
options = Options()
options.headless = True

WELCOME_MESSAGE = "Welcome to the Ikon Reservation Assistance Tool v1.1!"
print(WELCOME_MESSAGE)

# You can hardcore your credientials here rather than use the user prompts
# EMAIL = ""
# PASSWORD = ""
EMAIL = input('What is your ikon account email? ')
PASSWORD = getpass.getpass(prompt = 'What is your ikon account password? ')

DATE_PROMPT_TEXT ="""Input the day you are looking to find a res.
Your input MUST match this format in the below examples or the script will not work.
Ex 1: Sat Jan 02 2021
Ex 2: Thu Jan 21 2021

What day are you looking for?"""

DATE = input(DATE_PROMPT_TEXT)
# DATE = "Sat Jan 09 2021" # You can hardcode the date you're looking for here rather than use the user prompt

options = webdriver.ChromeOptions()
options.headless = True
USER = getpass.getuser()
PATH = "C:\\Users\\" + USER + "\\ChromeDriver\\chromedriver.exe"
driver = webdriver.Chrome(PATH,options=options)
driver.implicitly_wait(3) # Set a 3 second max wait time for web elements to load if not initially found
driver.get("https://account.ikonpass.com/en/login")

driver.find_element_by_id("email").send_keys(EMAIL)
driver.find_element_by_id("sign-in-password").send_keys(PASSWORD)
driver.find_element_by_xpath("//*[@id='scrolling-body']/section/div/div/div/div[1]/div/div/div[1]/div/form/button").click()
time.sleep(2)

driver.get("https://account.ikonpass.com/en/myaccount/add-reservations/")

found_res = False

while found_res == False:
    driver.find_element_by_xpath("//*[@id='react-autowhatever-resort-picker-section-3-item-0']").click()
    driver.find_element_by_xpath("//*[@id='root']/div/div/main/section[2]/div/div[2]/div[2]/div[2]/button").click()
    try:
        driver.find_element_by_css_selector("div [aria-label ='" + DATE + "']:not([class*='unavailable'])").click()
        found_res = True
    except:
        print("Not avaliable. Will try again in 3 seconds.")
        print('.')
        time.sleep(1)
        print('.')
        time.sleep(1)
        print('.')
        driver.refresh()

print('\\n')
print('Found an open res...trying to book...')
print('\\n')

# Save button
driver.find_element_by_xpath("//*[@id='root']/div/div/main/section[2]/div/div[2]/div[3]/div[1]/div[2]/div/div[4]/button[1]").click()
time.sleep(1)
# Continue to confirmation button
driver.find_element_by_xpath("//*[@id='root']/div/div/main/section[2]/div/div[2]/div[3]/div[2]/button").click()
time.sleep(1)
# I confirm checkbox
driver.find_element_by_xpath("//*[@id='root']/div/div/main/section[2]/div/div[2]/div[4]/div/div[4]/label/input").click()
time.sleep(1)
# Confirm reservation button
driver.find_element_by_xpath("//*[@id='root']/div/div/main/section[2]/div/div[2]/div[4]/div/div[5]/button").click()

print("Booked! You're ready to shred on " + DATE + "!")`

    return (
        <>
            <div>
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
                    <ul id="nav" className="nav">
                        <li><Link to='/'classname="smoothscroll" >Home</Link></li>
                        <li><Link to='/mathpreppro'classname="smoothscroll" >MathPrepPro</Link></li>
                        <li className='current'><Link to='/ikon'classname="smoothscroll" >Ikon</Link></li>
                        <li><Link to='/formula1'classname="smoothscroll" >Formula1</Link></li>
                        <li><Link to='/ISS'classname="smoothscroll" >ISS</Link></li>
                    </ul>
                </nav>
            </div>
            <Paper className={classes.main_paper} elevation={2}>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/ikon/ikon.png" alt="Pic Missing..." width="300px" style={{margin: "auto"}}/>
                </figure>
                <h3 style={{marginBottom: "25px"}}><a href="https://github.com/jhollier/Ikon-Selector">Github for this project!</a></h3>
                <h2>What about the Ikon pass?</h2>
                <p className={classes.para_text} >{para1}</p>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/ikon/theboyz.png" alt="Pic Missing..." width="600px" style={{margin: "auto"}}/>
                    <figcaption style={{margin: "auto"}}>Hittin' the glades.</figcaption>
                </figure>
                <h2>So...how did I get around this?</h2>
                <p className={classes.para_text} >{para2}</p>
                <p className={classes.para_text} >{para3}</p>
                <p className={classes.para_text} >{para4}</p>
                <CodeBlock
                    text={code}
                    language='python'
                    showLineNumbers='false'
                    theme={dracula}
                />
                <p></p>
                <p className={classes.para_text} >{para5}</p>
                <h6 className={classes.para_text} >Cheers,</h6>
                <h6 className={classes.para_text} > -Joe</h6>
            </Paper>
            <Footer />
        </>
    )
}

export default Ikon
