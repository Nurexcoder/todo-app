export const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export const todoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};
export const todoFlashVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -10 },
};
export const sortArray = [
    {
        label: 'Priority',
        value: 0
    },
    {
        label: 'Due Date',
        value: 1
    }
]

export const todoViewType = [
    {
        label: 'Today',
        value: 100
    },
    {
        label: 'Tommorow',
        value: 101
    },
    {
        label: 'All',
        value: 102
    }
]
export const priorityArray = [{ value: 0, label: 'General' }, { value: 1, label: "Low" }, { value: 2, label: "Medium" }, { value: 3, label: "High" }]
