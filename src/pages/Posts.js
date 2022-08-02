import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React from "react";
import { Grid, Item } from "semantic-ui-react";
import Topics from "../components/Topics";
import { db } from "../utils/firebase";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
function Posts() {
    const [posts, setPosts] = React.useState([]);
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get('topic');
    const lastPostSnapshotRef = React.useRef();

    React.useEffect(() => {
        if (currentTopic) {
            const q = query(collection(db, "posts"), where('topic', '==', currentTopic), orderBy('createdAt', 'desc'), limit(100));
            onSnapshot(q, (docsnapshot) => {
                setPosts(
                    docsnapshot
                        .docs.map
                        ((doc) => ({
                            ...doc.data(), id: doc.id
                        })), lastPostSnapshotRef.current =
                docsnapshot.docs[docsnapshot.docs.length - 1]
                );
            });
        } else {
            const q = query(collection(db, "posts"), orderBy('createdAt', 'desc'), limit(100))
            onSnapshot(q, (docsnapshot) => {
                setPosts(
                    docsnapshot
                        .docs.map
                        ((doc) => ({
                            ...doc.data(), id: doc.id
                        })), lastPostSnapshotRef.current =
                docsnapshot.docs[docsnapshot.docs.length - 1]
                );
            });
        }
    }, [currentTopic]);
    return [
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Topics />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Item.Group>
                        {posts.map((post) => {
                            return <Post post={post} />
                        })}
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    ];
};

export default Posts;