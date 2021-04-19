import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link, useStaticQuery } from 'gatsby'
import './index.css'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSelector } from "react-redux"
import { State } from "../Global/Types/SliceTypes"
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import firebase from 'gatsby-plugin-firebase';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from "../Global/Slice/LogInSlice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      textAlign: 'center'
    },
  }),
);

const IndexPage = () => {

  const classes = useStyles();
  const islit = useSelector((state: State) => state.themes.value);
  const isLogged = useSelector((state: State) => state.LogIn.value);
  const dispatch = useDispatch();

  const onLogIn = () => {
    // require('firebase/auth')
    // const auth = firebase.auth();
    // const provider = new firebase.auth.GoogleAuthProvider();

    // auth
    // .signInWithPopup(provider)
    // .then((_result: any) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     dispatch(setLoggedIn())
    // }).catch((error: any) => {
    //     console.log(error);;
    // });
  }


  const result: any = useStaticQuery(graphql`
  {
    allContentfulBlogPost {
        edges {
          node {
            title
            slug
            description
            image {
              fluid {
                src
              }
              title
            }
          }
        }
      }
  }
  `)

  let posts: any[];

  if (isLogged) {
    posts = result && result.allContentfulBlogPost.edges
  }

  else {
    posts = result && result.allContentfulBlogPost.edges.slice(0, 2)
  }

  return (
    <Layout>
      <SEO title="Home" />
      {posts && posts.map((post, index) => (
        <Link className={classes.link} to={post.node.slug} key={index}>
          <Paper elevation={3} style={{ backgroundColor: islit ? '' : '#171d27' }} className={`root ${classes.root}`}>
            <img className="img" src={post.node.image.fluid.src} alt={post.node.title} title={post.node.title} />
            <div className="about">
              <h4>{post.node.title}</h4>
              <p>{post.node.description}</p>
            </div>
          </Paper>
        </Link>
      ))
      }
      {isLogged ? null : (
        <Accordion style={{ backgroundColor: islit ? '' : '#1d212d' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Show more</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ color: 'red' }} variant="h5">
              Log in to view more.
            </Typography>
            <Button variant="contained" color="secondary" style={{ marginLeft: '1rem' }} onClick={onLogIn}>
              Log in
            </Button>
          </AccordionDetails>
        </Accordion>
      )}
    </Layout>
  );
}
export default IndexPage
