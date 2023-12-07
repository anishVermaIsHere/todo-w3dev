import {Dispatch,SetStateAction} from 'react';

type TabPropType ={
    selectTab:number;
    setSelectTab:Dispatch<SetStateAction<number>>;
}
const Tab = ({selectTab,setSelectTab}:TabPropType) => {
    const toggleTab=(index:number)=>{
        setSelectTab(index);
    }
    const navList=[
        {
            label:'Pending',
            value:0
        },
        {
            label:'Completed',
            value:1
        }
    ];

  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            role="tablist"
        >
            {navList.map((tab,index)=><li className="mr-2" role="presentation" key={index}>
                <button
                    className={selectTab==index?`inline-block p-4 border-b-4 rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 border-gray-600`:`inline-block p-4 border-b-4 rounded-t-lg hover:text-gray-600 hover:border-gray-600 dark:hover:text-gray-300`}
                    id="pending"
                    aria-label='pending tab'
                    type="button"
                    role="tab"
                    onClick={()=>toggleTab(index)}
                >
                    {tab.label}
                </button>
            </li>)}
        </ul>
    </div>
  )
}

export default Tab