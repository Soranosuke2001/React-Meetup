import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
};

export const getStaticPaths = async () => {
    const mongoAddress = 'mongodb+srv://sorazora14:hunter1201@cluster0.nazop5r.mongodb.net/meetups?retryWrites=true&w=majority';
    const client = await MongoClient.connect(mongoAddress);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() }}))
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    const mongoAddress = 'mongodb+srv://sorazora14:hunter1201@cluster0.nazop5r.mongodb.net/meetups?retryWrites=true&w=majority';
    const client = await MongoClient.connect(mongoAddress);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    };
};

export default MeetupDetails;