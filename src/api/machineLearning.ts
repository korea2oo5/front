import axios from 'axios';

export async function domainCreateModel(data_input: any, data_output: any) {
    const { data } = await axios.post('/api/machineLearning/domainCreateModel', {
        data_input: data_input,
        data_output: data_output,
    });
    console.log(data);
    return data;
}
export async function domainCreateResult(model: any, data_label: any, newRunResult: any) {
    const { data } = await axios.post('/api/machineLearning/domainCreateResult', {
        model: model,
        data_output: data_label,
        predict_input: newRunResult,
    });
    return data;
}
