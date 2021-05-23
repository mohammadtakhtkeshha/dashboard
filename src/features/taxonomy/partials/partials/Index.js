import { getStates, getState } from 'core/services/taxonomy/partials/category.taxonomy.service';

export const setCurrentDynamicHeigh = (statesValue,setDynamicHeight) => {
  if (statesValue !== undefined && statesValue.length > 0) {
    let count = statesValue.length;
    setDynamicHeight(`${count * 63}px`);
  }
};

export const getStatesMethod = (setLoading, setStates, type,setDynamicHeight) => {
  getStates(setLoading, type).then(response => {
    setStates(response.data);
    setCurrentDynamicHeigh(response.data,setDynamicHeight)
  });
};

export const getTaxonomyStatesList = (setLoading, handlePagination) => {
  setLoading(true);
  getStates(setLoading).then(response => {
    setLoading(false);
    const states = response.data;
    handlePagination(states);
  });
};

export const handlePaginationMethod = (currentStates, setStates, setTotalPage, setChunks, t) => {
  // setStates({
  //     id: 'root',
  //     title: t('taxonomy:categories'), children: currentStates
  // })
  // const chunks = chunkItem(currentStates);
  // const total = handleTotalPage(currentStates);
  // setTotalPage(total);
  // let currentChunks = []
  // for (let chunk of chunks) {
  //     currentChunks.push({
  //         id: 'root',
  //         title: t('translation:categories'), children: chunk
  //     })
  // }
  setChunks(currentStates);
};

export const getCategoryMethod = (id, setLoading, setState) => {
  setLoading(true);
  getState(id, setLoading).then(response => {
    setLoading(false);
    const currentState = response.data;
    setState(currentState);
  });
};

export const constState = type => {
  return {
    vid: [
      {
        target_id: type,
      },
    ],
    status: [
      {
        value: true,
      },
    ],
    name: [
      {
        value: '',
      },
    ],
    description: [
      {
        value: '',
      },
    ],
    weight: [
      {
        value: 0,
      },
    ],
    parent: [
      {
        target_id: null,
        target_type: 'taxonomy_term',
      },
    ],
    path: [
      {
        alias: '',
      },
    ],
  };
};

export const emptyCategory = {
  vid: [
    {
      target_id: 'category',
    },
  ],
  status: [
    {
      value: true,
    },
  ],
  name: [
    {
      value: '',
    },
  ],
  description: [
    {
      value: '',
    },
  ],
  weight: [
    {
      value: 0,
    },
  ],
  parent: [
    {
      target_id: null,
      target_type: 'taxonomy_term',
    },
  ],
  path: [
    {
      alias: '',
    },
  ],
};
