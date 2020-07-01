import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Example extends React.Component {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    render() {
        return (
            <div>
                <button className='btn btn-info'
                        onClick={this.createNotification('info')}>Info
                </button>


                <NotificationContainer/>
            </div>
        );
    }
}

export default Example;