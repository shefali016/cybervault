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
    return {
            logo: '',
            campaignName: '',
            campaignDate: '',
            clientName: '',
            clientEmail: '',
            address: '',
            city: '',
            state: '',
            country: '',
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
            ],
            campaignBudget: '',
            campaignExpenses: '',
            expenses: [
                {
                    expense: '',
                    cost: 0,
                },
                {
                    expense: '',
                    cost: 0,
                }
            ],
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
