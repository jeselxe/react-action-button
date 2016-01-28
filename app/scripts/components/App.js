import React, {Component} from 'react';
import ActionButton from './ActionButton';

class App extends Component {
    render() {
        return (
            <div>
                <ActionButton>
                    <ActionButton.Item icon="ion-ios-cloud-download-outline">Download</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-upload-outline">Share</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-download-outline">Save</ActionButton.Item>
                    <ActionButton.Item icon="ion-ios-trash-outline">Trash</ActionButton.Item>
                </ActionButton>
            </div>
        );
    }
}


export default App;
