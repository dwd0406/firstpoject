import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { List } from "semantic-ui-react";
import { db } from "../utils/firebase";
import "firebase/firestore";
import { Link, useLocation } from "react-router-dom";

function Topics() {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get('topic');
    const [topics, setTopics] = React.useState([]);
    React.useEffect(() => {
        onSnapshot(collection(db, "topics"), (snapshot) =>
            setTopics(
                snapshot
                    .docs
                    .map((doc) => doc.data())
            ))
    },
        []
    );
    return (
        <List
            inverted
            animated
            selection>
            {topics.map((topic) => {
                return (
                    <List.Item
                        key={topic.name}
                        as={Link}
                        to={`/posts?topic=${topic.name}`}
                        active={currentTopic === topic.name}
                    >
                        <List.Header>
                            {topic.name}
                        </List.Header>

                    </List.Item>
                );
            })}
        </List>
    );
}

export default Topics;
