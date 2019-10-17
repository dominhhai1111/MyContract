import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import ContactListItem from '../components/ContactListItem';

import { fetchContacts } from '../utils/api';

const keyExtractor = ({ phone }) => phone;

export default class Contracts extends React.Component {
    state = {
        contacts: [],
        loading: true,
        error: false,
    };

    async componentDidMount() {
        try {
            const contacts = await fetchContacts();

            this.setState({
                contacts,
                loading: false,
                error: false,
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: true,
            });
        }
    }

    renderContract = ({ item }) => {
        const { name, avatar, phone } = item;

        return <ContactListItem name={name} avatar={avatar} phone={phone} />
    };

    render() {
        const { loading, contacts, error } = this.state;

        const contactSorted = contacts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}
                {!loading &&
                    !error && (
                        <FlatList
                            data={contactSorted}
                            keyExtractor={keyExtractor}
                            renderItem={this.renderContract}
                        />
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
});