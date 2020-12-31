import { ProjectData } from './types/index';

export function generateUid() {
    let S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    );
}

export function getProductData() {
    const _data: ProjectData = {
        stepOne: {
            logo: '',
            campaignName: '',
            campaignDate: '',
            clientName: '',
            clientEmail: '',
            address: '',
            city: '',
            state: '',
            country: ''
        },
        stepTwo: {
            campaignObjective: '',
            campaignDeadLine: '',
            description: '',
            tasks: [
                {
                    task: '',
                    startDay: '',
                    deadLine: ''
                }, {
                    task: '',
                    startDay: '',
                    deadLine: ''
                }
            ]
        },
        stepThree: {
            campaignBudget: '',
            campaignExpences: '',
            expenses: [
                {
                    expence: '',
                    cost: 0,
                },
                {
                    expence: '',
                    cost: 0,
                }
            ]
        },
        stepFour: {
            milestone: [
                {
                    milestone: '',
                    payment: 0,
                },
                {
                    milestone: '',
                    payment: 0,
                }
            ]
        }
    }
    return _data;
}
