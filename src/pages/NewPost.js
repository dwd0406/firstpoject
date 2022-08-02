import { Button, Container, Form, Header, Image } from "semantic-ui-react";
import React from "react";
import { db } from "../utils/firebase";
import "firebase/firestore";
import { collection, onSnapshot, Timestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        onSnapshot(collection(db, "topics"), (snapshot) =>
            setTopics(
                snapshot
                    .docs
                    .map((doc) => doc.data())
            ));
    }, []);

    const options = topics.map((topic) => {
        return {
            text: topic.name,
            value: topic.name,
        };
    })

    const previerUrl = file
        ? URL.createObjectURL(file)
        : 'https://react.semantic-ui.com/images/wireframe/image.png';

    function onSubmit() {
        setIsLoading(true)
        const docRef = doc(collection(db, 'posts'));
        const storge = getStorage();
        const storgeRef = ref(storge, 'post-images/' + docRef.id)
        const metadata = {
            contentType: '',

        };
        uploadBytes(storgeRef, file, metadata).then(() => {
            getDownloadURL(storgeRef).then((imageUrl) => {
                setDoc(docRef, {
                    title,
                    content,
                    topic: topicName,
                    createdAt: Timestamp.now(),
                    author: {
                        displayName: auth.currentUser.displayName || '',
                        photoURL: auth.currentUser.photoURL || '',
                        uid: auth.currentUser.uid,
                        email: auth.currentUser.email,
                    },
                    imageUrl,
                })
                    .then(() => {
                        setIsLoading(false);
                        navigate("/posts");
                    })
            })
        })
    }
    return [
        <Container>
            <Header inverted>發表文章</Header>
            <Form inverted onSubmit={onSubmit}>
                <Image
                    src={previerUrl}
                    size="small"
                    floated="left"
                />
                <Button
                    inverted
                    basic as="label"
                    htmlFor="post-image">
                    上傳文章圖片
                </Button>
                <Form.Input
                    type="file"
                    id="post-image"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Form.Input
                    placeholder="輸入文章標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                    placeholder="輸入文章內容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Form.Dropdown
                    placeholder="選擇文章主題"
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, { value }) => setTopicName(value)}
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    ]

}
export default NewPost;