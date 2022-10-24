
export const typeFilters = {
    label: 'Sort by',
    key: 'type',
    placeholder: 'Select...',
    options: [{
        key : 'ad_adoption',
        label : 'Adopt a Pet', 
    },
    {
        key : 'ad_purchase',
        label : 'Purchase a Pet', 
    }
],
};


export const category = {
    label: 'Pet Category',
    key: 'category',
    placeholder: 'Select',
    options: [],
};


export const gender = {
    label: 'Gender',
    key: 'gender',
    placeholder: 'Select',
    options: [
        {
            key : 'male',
            label  : 'Male'
        },
        {
            key : 'female',
            label  : 'Female'
        },
    ],
};


export const breed = {
    label: 'Breed',
    key: 'breed',
    placeholder: 'Select',
    options: [],
};

export const ages = {
    label: 'Age',
    key: 'age',
    multiple : false,
    placeholder: 'Select',
    options: [],
};


export const groups = {
    label: 'Group',
    key: 'group',
    multiple : false,
    placeholder: 'Select',
    options: [],
};


export const tempraments = {
    label: 'Temprament',
    multiple : true,
    key: 'tempraments',
    placeholder: 'Select',
    options: [],
};

export const trainings = {
    label: 'Training',
    multiple : true,
    key: 'trainings',
    placeholder: 'Select',
    options: [],
};



export const search = {
    label: '',
    type : 'field',
    attrs : {
        type : 'text',
    },
    icon : 'fa fa-search',
    key: 'search',
    placeholder: 'Search Here....',
};

export const range = {
    label: `<span>Maximum Distance</span><span class="text-secondary">250 km</span>`,
    type : 'field',
    multiple : true,
    key: 'distance',
    attrs : {
        min : 10,
        max : 250,
        type : 'range',
        class: 'form-range w-100',
        id : "distance",
    },
};


export const countries = {
    label: 'Country',
    key: 'country_id',
    placeholder: 'Select',
    options: [],
};

export const states = {
    label: 'State',
    key: 'state_id',
    placeholder: 'Select',
    options: [],
};

export const cities = {
    label: 'City',
    key: 'city_id',
    placeholder: 'Select',
    options: [],
};