import { collection, onSnapshot, where,query } from "firebase/firestore";
import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { db } from "../utils/firebase";
import Post from "../components/Post";
import { auth } from "../utils/firebase";
import MyMenu from "../components/MyMenu";

function MyCollections() {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        const q = query(collection(db, "posts"), where("collectedBy", "array-contains", auth.currentUser.uid));
        onSnapshot(q, (docsnapshot) => {
            setPosts(
                docsnapshot
                    .docs.map
                    ((doc) => ({
                        ...doc.data(), id: doc.id
                    })
                    ));
        });
    });
    return [ 
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <MyMenu />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Item.Group>
                        {posts.map((post) => {
                            return <Post post={post} key={post.id} />
                        })}
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
        </Grid>
    ];
};

export default MyCollections;