import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Add and view every entry of React Meetups!" />
            </Head>
            <MeetupList meetups={props.meetups}></MeetupList>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const mongoAddress = 'mongodb+srv://sorazora14:hunter1201@cluster0.nazop5r.mongodb.net/meetups?retryWrites=true&w=majority';
    const client = await MongoClient.connect(mongoAddress);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
};

// Alternative option to getStaticProps()
// This will revalidate the data for eery incoming data request
// export const getServerSideProps = (context) => {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export default HomePage;