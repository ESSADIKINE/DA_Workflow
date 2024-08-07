import React, { useState, useRef } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Chip } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const ContactSuppliersPage = () => {
    const [emails, setEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const quillRef = useRef(null);

    const handleAddEmail = () => {
        if (emailInput && !emails.includes(emailInput)) {
            setEmails([...emails, emailInput]);
            setEmailInput('');
        }
    };

    const handleDeleteEmail = (emailToDelete) => {
        setEmails(emails.filter((email) => email !== emailToDelete));
    };

    const handleSendEmails = async () => {
        const editor = quillRef.current.getEditor();
        const messageHtml = editor.root.innerHTML;

        try {
            const sendEmailPromises = emails.map(email =>
                axios.post('http://localhost:3000/api/emails/send', {
                    to: email,
                    subject,
                    html: messageHtml,
                })
            );
            await Promise.all(sendEmailPromises);
            alert('Emails sent successfully!');
        } catch (err) {
            console.error('Failed to send emails:', err);
            alert('Failed to send emails. Check the console for more details.');
        }
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Contacter les Fournisseurs
                </Typography>
                <Paper sx={{ padding: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                            label="Ajouter un email"
                            variant="outlined"
                            fullWidth
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <Button onClick={handleAddEmail} sx={{ ml: 2 }} variant="contained">
                            Ajouter
                        </Button>
                    </Box>
                    <Box mb={2}>
                        {emails.map((email, index) => (
                            <Chip
                                key={index}
                                label={email}
                                onDelete={() => handleDeleteEmail(email)}
                                sx={{ margin: 0.5 }}
                            />
                        ))}
                    </Box>
                    <TextField
                        label="Sujet"
                        variant="outlined"
                        fullWidth
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <ReactQuill
                        theme="snow"
                        ref={quillRef}
                        value={message}
                        onChange={setMessage}
                        style={{ height: '300px', marginBottom: '30px' }}
                    />
                    <Button onClick={handleSendEmails} variant="contained" color="primary">
                        Envoyer les Emails
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default ContactSuppliersPage;
