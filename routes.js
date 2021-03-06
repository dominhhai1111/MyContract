import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const getDrawerItemIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const AppNavigator = createStackNavigator(
    {
        Contacts: {
            screen: Contacts,
            navigationOptions: {
                title: 'Contacts',
                headerStyle: {
                    backgroundColor: colors.white,
                },
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({ navigation: { state: { params } } }) => {
                const { contact: { name } } = params;
                return {
                    title: name.split(' ')[0],
                    headerTintColor: 'white',
                };
            },
        },
        Favorites: {
            screen: Favorites,
        },
        User: {
            screen: User,
        }
    },
    {
        initialRouteName: 'User',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.blue,
            },
        },
    }
);

const ContactsScreens = createStackNavigator(
    {
        Contacts: {
            screen: Contacts,
        },
        Profile: {
            screen: Profile,
        },
    },
    {
        initialRouteName: 'Contacts',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('list'),
            drawerIcon: getTabBarIcon('list'),
        },
    }
);

const FavoritesScreens = createStackNavigator(
    {
        Favorites: {
            screen: Favorites,
        },
        Profile: {
            screen: Profile,
        },
    },
    {
        initialRouteName: 'Favorites',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('star'),
            drawerIcon: getTabBarIcon('star'),
        },
    }
);

const UserScreens = createStackNavigator(
    {
        User: {
            screen: User,
        },
        Options: {
            screen: Options,
        }
    },
    {
        mode: 'modal',
        initialRouteName: 'User',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('person'),
            drawerIcon: getTabBarIcon('person'),
        },
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Contacts: {
            screen: ContactsScreens,
        },
        Favorites: {
            screen: FavoritesScreens,
        },
        User: {
            screen: UserScreens,
        },
    },
    {
        initialRouteName: 'Contacts',
        tabBarOptions: {
            style: {
                backgroundColor: colors.greyLight,
            },
            showLabel: true,
            showIcon: true,
            activeTintColor: colors.blue,
            inactiveTintColor: colors.greyDark,
            renderIndicator: () => null,
        },
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        Contacts: {
            screen: ContactsScreens,
        },
        Favorites: {
            screen: FavoritesScreens,
        },
        User: {
            screen: UserScreens,
        },
    },
    {
        initialRouteName: 'Contacts',
    }
);

// export default AppContainer = createAppContainer(AppNavigator);
// export default AppContainer = createAppContainer(TabNavigator);
export default AppContainer = createAppContainer(DrawerNavigator);