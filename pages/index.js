import Head from 'next/head';

const answer = {
    marginTop: 200,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: '120pt',
    fontFamily: 'Arial, sans-serif',
    textDecoration: 'none',
    cursor: 'default',
    textTransform: 'uppercase',
    textAlign: 'center',
};

const info = {
    width: '100%',
    display: 'inline-block',
    textAlign: 'center',
};

const Yes = () => <h1 style={answer}>🎉 yes 🎉</h1>;
const No = () => <h1 style={answer}>no</h1>;
const Info = ({ children }) => <small style={info}>{children}</small>;

export default ({ rating }) => (
    <>
        <Head>
            <title>2300andy?</title>
            <link rel="icon" href="/botez.png" />
        </Head>
        {rating < 2300 ? <No /> : <Yes />}
        <Info>it's {rating}</Info>
    </>
);

async function getRating(username) {
    const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const json = await res.json();
    return json.chess_blitz.last.rating;
}

export async function getStaticProps() {
    return {
        props: {
            rating: await getRating('alexandrabotez'),
            revalidate: 60,
        },
    };
}
