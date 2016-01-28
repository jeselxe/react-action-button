import React, {Component} from 'react';
import ActionButton from './ActionButton';

class App extends Component {
    render() {
        return (
            <div>
                <ActionButton icon="ion-edit">
                    <ActionButton.Item icon="ion-ios-cloud-download">Download</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-upload">Share</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-download">Save</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-trash">Trash</ActionButton.Item>
                </ActionButton>
            </div>
        );
    }
}


export default App;
