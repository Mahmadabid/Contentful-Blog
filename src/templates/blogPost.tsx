import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../Global/Types/SliceTypes';
import SEO from '../components/seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './blogPost.css'
import { CardMedia } from '@material-ui/core';
import { setLoggedIn } from "../Global/Slice/LogInSlice"
import { Link } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';

const useStyles = makeStyles({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default function ImgMediaCard(props: any) {

    const classes = useStyles();
    const info = props.pageContext.data
    const isLogged = useSelector((state: State) => state.LogIn.value);
    const dispatch = useDispatch();

    const onLogIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((_result: any) => {
                /** @type {firebase.auth.OAuthCredential} */

                dispatch(setLoggedIn())
            }).catch((error: any) => {
                console.log(error);;
            });
    }

    return (
        <Layout>
            <SEO title={info.title} />
            <div>
                <div className="img-align">
                    <CardMedia className='imagesBlog' component="img" alt={info.image.title} title={info.image.title} src={info.image.fluid.src} />
                </div>
                <Typography variant="h3">{info.title}</Typography>
                <Typography variant="body2" style={{ marginBottom: '1rem' }}><span style={{ fontWeight: 'bold', color: 'green' }}>Author: </span>{info.author.toUpperCase()}</Typography>
                {!isLogged ?
                    <Typography component="div">
                        <div className="truncate">
                            {documentToReactComponents(JSON.parse(info.content.raw))}
                        </div>
                        <hr style={{ marginTop: '1rem' }} />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography style={{ color: 'red' }} variant="h5">
                                Log in to view more.
                            </Typography>
                            <Button variant="contained" color="secondary" style={{ marginLeft: '1rem' }} onClick={onLogIn}>
                                Log in
                            </Button>
                        </div>
                    </Typography>
                    :
                    <Typography component="div">
                        {documentToReactComponents(JSON.parse(info.content.raw))}
                        <div className={classes.buttons}>
                            {props.pageContext.previous ?
                                <Link to={`/${props.pageContext.previous.slug}`} style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary">{props.pageContext.previous.title}</Button></Link>
                                :
                                <span>&nbsp;</span>}
                            {props.pageContext.next ?
                                <Link to={`/${props.pageContext.next.slug}`} style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary">{props.pageContext.next.title}</Button></Link>
                                :
                                <span>&nbsp;</span>}
                        </div>
                    </Typography>
                }
            </div>
        </Layout>
    );
}
