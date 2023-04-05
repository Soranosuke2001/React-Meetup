import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enteredMeetupData)
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add a new meeting</title>
                <meta name="description" content="Add your own react meeting to the list!" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
        </Fragment>
    );
};

export default NewMeetupPage;