import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import { CodeBlock, dracula } from "react-code-blocks";
import { fontStyle } from '@material-ui/system';
import { isClassExpression } from '@babel/types';

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

const Mathpreppro = () => {

    const classes = useStyles();

    var profilepic= "../public/images/profilepic.jpg";

    const para1 = `As any good engineer knows, expanding your toolbox with tools is always a good idea. Even as a mechanical 
    engineer by trade, a good working knowledge of at least one software language can make you pretty dangerous. As the
    COVID lockdown ensued, I took this as a good opportunity to begin learning a software language. Python was the obvious choice
    given my current job. Nothing like replacing a frustrating commute
    with banging your head against a wall trying to learn SWE fundamentals - that is eactly what I did :) I didn't want to just take
    a class. I wanted to treat this like a real business and have a concrete projecg in mind that I could serisouly learn from and deploy
    with a custom domain.`

    const para2 = `It is a highschool standardized math test preparation business built on a simple, transferable business model.
    A user can sign up to recieve a totally free daily curated (by yours truely) ACT / SAT math practice problem in their
    email inbox. For a small monthly fee, the user is also provided with an in depth video solution. A paying user is also given access
    to a web interface for all previous problems and solutions. I love this business model for a few reasons: 1) It helps people.
    2) Too many "things" are grabbing for our attention these days in the digitial world that we live in. The simple daily email is the
    only interaction with the user and it is easy to unsub or cancel. 3) As the user base scales, the effort required by me to create
    content remains constant.`

    const para3 = `The bulk of the development centered around a webapp built off of the Django framework. The backend consisted of math problem
    content and user databases. The front end allowed for a clean admin content management interface and a paying user interface for accessing
    previous problems. I used Pythonanywhere.com to host. I chose them for hosting simplicity, since my app was also relatively simple, and great
    customer service - they did not disapoint! What about all the other cogs needed to make this a functioning clock? Check out the simplied workflow below.`

    const para4 = `Rather than reinventing the wheel for the reamining bits to make this a fully functional webapp, I leveraged several other simple
    yet powerful services. Landing pages were created using Systeme.io, a sales funnel and subscription management service. I created funnels for account
    managment services like subscribing, canceling, etc. SendinBlue served as a totally free contact manager for account change queues.
    These serviced talked through Zapier, a really cool API manager. I wrote a series of cron jobs to continuously update the Django backend with information
    from all of these applications as well as to generate and send the daily emails. The code block below is the job that creates the daily eamils and pushes
    them to AWS for distribution.`

    const para5 = `Amazon's SES was the obvious choice for an SMTP client with a pay-per-email model, simple API, and scalability confidence.
    Let's take a look at the primary interaction with the user - the daily email. This is a sample pro user daily eamil that shows how clean looking it is.
    A link will bring you to the webapp front end to view the problem or an image of it can be seen below. A clickable gif that links to the video solution
    (there is no clean way to embedded videos in the email content) is generated for pro users. The footer provides links to any forms on the front end
    needed to update the user account.`

    const para6 = `I thought it would be fun to talk about a major roadblock I ran into during development and the clever solution I found. There are
    several nice javascript libraries out there that help render math symbols/ equations used in the daily problems. My initial plan was to generate the
    problem emails using the same problem statement html code that is used for the webapp front end. As it turns out, most email clients disable 
    javascript and can even flag senders that try to include scripts...womp-womp. The obvious solution here is to generate images of the problems.
    I needed to find a slick way to do this at the same time that I upload a problem. Boom, in walks a really cool tool call a webdriver. When submitting
    a problem, I ran a webdriver called Selenium which rendered the problem html in a browser, took a screenshot of the div element, and uploaded it to
    the database. All good? Think again. This really only worked if the problem div element was short enough to completely display vetically on the webdriver browser - problem
    images were just getting cut off. I never though the classic middle school prank of rotating the windows display sideways using "CTRL + ATL + LEFT" would
    actually come in handy one day - vuala. Having the webdriver rotate the display sidways before taking a screenshot proved give more than enough height to fit any
    problem image size. The interface to add a problem is shown below. At the bottom, the rendered html as well as the webdriver screenshot is shown so that I
    can confirm a good image was taken right after submitting a problem.`

    const para7 = `Not quite. I created 30 probelms and paid several of my engineering friends in beer to beta test everything. This went well but generating
    the video solution content proved to be much more difficult than I expected. Scripting, filming, editing, and redoing it all again once you find a simple
    mistake wasn't nearly as fun as the webapp development process. The 2 coding courses and couple hundred hours of sweat equity used learn the fundamentals of software
    development have really paid off for me though as the foundation for bringing SWE into my career. Also, the foundation and business model is easily transferable to
    something else in the future.`

    const para8 = `If you're still reading this, I hope you can appreciate the momumental effort it took to make this idea a reality in my free time with zero prior software
    experience. I went from barely knowing what object oriented programing was to deloyment in a few months.`

    const code = `import os
    os.environ.setdefault('DJANGO_SETTINGS_MODULE','MathPrepPro.settings')
    import django
    django.setup()
    ################################################################################
    
    from django.core.mail import send_mail, send_mass_mail, get_connection, EmailMultiAlternatives
    from AppOne import models
    from django.contrib.auth.models import User
    from django.template.loader import render_to_string
    from django.utils.html import strip_tags
    from django.shortcuts import render
    from emails import *
    import sys
    
    ################################ NOTES #########################################
    
    # Production to dos:
    # 1. Change the from email
    # 2. Update the host_base
    
    ################################################################################
    
    def send_daily_emails():
        '''
        Compiles and pushes all daily emails to AWS SES.
        Returns a list of user emails that failed to compile.
        '''
    
        admin_errors = []
        email_list = []
        user_query = None
        
        user_query = User.objects.all()
        admin_errors.append("".join(['1, ', str(sys.exc_info()[0]), ]))
    
        for person in user_query:
    
            try:
                person_userprofileinfo = models.UserProfileInfo.objects.get(user = person)
                problem_number = person_userprofileinfo.problem_number
                problem_query = models.Problem.objects.get(pk=problem_number)
                to_email = person.email
                email_title = "".join(["Daily Problem - ", str(problem_query.problem_name)])
    
                context = {}
                context['problem_statement'] = problem_query.problem_statement
                context['problem_image_url'] = "".join([host_base_site, "static/images/problems/", str(problem_query.pk), "_statement.png"])
                context['video_url'] = problem_query.problem_solution_url
                context['pk'] = problem_number
                context['pro'] = person_userprofileinfo.pro
                if context['pro']:
                    token_obj = models.Token.objects.get(user=person)
                    token = token_obj.key
                context['solutions_url'] = "".join([host_base_site, "prolist/", token])
                context['pro_detail_url'] = "".join([host_base_site, "prolist/", token, "/", str(problem_number)])
                email_list.append(generate_email('AppOne/daily_problem.html', context, email_title, [to_email]))
            except:
                # Do not error out if a single email fails to compile
                admin_errors.append("".join([person.email, str(sys.exc_info()[0]), ]))
    
        get_connection().send_messages(email_list)
        admin_errors.append("".join(['3, ', str(sys.exc_info()[0]), ]))
        
        return admin_errors
    
    
    def notify_admin(errors):
        '''
        Notify the admin directly if any emails failed to comiple.
        Takes in a list of user emails that did not compile.
        '''
        
            context = {}
            email_title = "Admin Errors - 5-send-daily-emails"
            to_email = 'mathpreppro@gmail.com'
            context['errors'] = errors
            error_email = []
            error_email.append(generate_email('AppOne/admin_error.html', context, email_title, [to_email]))
            get_connection().send_messages(error_email)
     
    
    if __name__ == '__main__':
        errors = send_daily_emails()
        if errors:
            notify_admin(errors)`

    return (
        <>
            <div>
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
                    <ul id="nav" className="nav">
                        <li><Link to='/'classname="smoothscroll" >Home</Link></li>
                        <li className='current'><Link to='/mathpreppro'classname="smoothscroll" >MathPrepPro</Link></li>
                        <li><Link to='/ikon'classname="smoothscroll" >Ikon</Link></li>
                        <li><Link to='/formula1'classname="smoothscroll" >Formula1</Link></li>
                        <li><Link to='/ISS'classname="smoothscroll" >ISS</Link></li>
                    </ul>
                </nav>
            </div>
            <Paper className={classes.main_paper} elevation={2}>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/mathpreppro/logo.png" alt="Pic Missing..." width="500px" style={{margin: "auto"}}/>
                    {/* <figcaption style={{margin: "auto"}}>Cool logo I created.</figcaption> */}
                </figure>
                <h3 style={{marginBottom: "25px"}}><a href="https://github.com/jhollier/MathPrepPro">Github for this project!</a></h3>
                <h2>Why MathPrepPro?</h2>
                <p className={classes.para_text} >{para1}</p>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/mathpreppro/pad.png" alt="Pic Missing..." width="800px" style={{margin: "auto"}}/>
                    <figcaption style={{margin: "auto"}}>Sales funnel banner.</figcaption>
                </figure>
                <h2>So what the heck is MathPrepPro?</h2>
                <p className={classes.para_text} >{para2}</p>
                <h2>So how did I do it?</h2>
                <p className={classes.para_text} >{para3}</p>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/mathpreppro/workflow.png" alt="Pic Missing..." width="800px" style={{margin: "auto"}}/>
                    <figcaption style={{margin: "auto"}}>Simplified project workflow.</figcaption>
                </figure>
                <p className={classes.para_text} >{para4}</p>
                <CodeBlock
                    text={code}
                    language='python'
                    showLineNumbers='false'
                    theme={dracula}
                />
                <p></p>
                <p className={classes.para_text} >{para5}</p>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column"}}>
                    <img src="images/mathpreppro/email.gif" alt="Pic Missing..." width="600px" style={{margin: "auto"}}/>
                    <figcaption style={{margin: "auto"}}>Sample daily email for a pro user.</figcaption>
                </figure>
                <h2>Unique challenge I had to solve.</h2>
                <p className={classes.para_text} >{para6}</p>
                <figure style={{padding: '30px', margin: "auto", display: "flex", flexFlow: "column", border: "10px"}}>
                    <img src="images/mathpreppro/addproblem.png" alt="Pic Missing..." width="600px" style={{margin: "auto"}}/>
                    <figcaption style={{margin: "auto"}}>Problem addition admin interface.</figcaption>
                </figure>
                <h2>So is MathPrepPro up and running?</h2>
                <p className={classes.para_text} >{para7}</p>
                <p className={classes.para_text} >{para8}</p>
                <h6 className={classes.para_text} >Cheers!</h6>
                <h6 className={classes.para_text} > -Your MathPrepPro</h6>
            </Paper>
            <Footer />
        </>
    )
}

export default Mathpreppro
