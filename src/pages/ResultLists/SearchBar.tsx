import React, { useEffect, useState } from 'react';
import { IconCross } from '@/components/icon/IconCross';
import { useForm } from 'react-hook-form';
import { checkWhiteSpace } from '@/utils/checkWhiteSpace';
import { SearchType } from '@/types';
import { useLocation, useNavigate } from 'react-router-dom';
import IconMagnifyingGlass from '@/components/icon/IconMagnifyingGlass';
import cn from 'classnames';

interface SearchBarProps {
  name: string;
  categoryId: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ name, categoryId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlData = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputValue: name,
    },
  });

  const [isInputValue, setIsInputValue] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (name) {
      setIsInputValue(true);
    }
  }, [name]);

  const onChangeSearch = (value: string) => {
    if (!checkWhiteSpace(value)) {
      if (value) {
        setIsInputValue(true);
        return;
      }
    }
    setIsInputValue(false);
  };

  const searchByInput = (text: string) => {
    let propsState = {
      productName: text,
      category: null,
      searchType: SearchType.SEARCH_BY_NAME,
      shopData: urlData?.shopData,
    };
    navigate(`/resultproducts`, { state: propsState });
  };

  const onSubmit = (data: any) => {
    searchByInput(data.inputValue.trim());
  };

  const removeInputTag = () => {
    const propsState = {
      searchType: SearchType.SEARCH_BY_NAME,
      shopData: urlData?.shopData,
    };
    setIsInputValue(false);
    reset();
    navigate('/productsearch', { state: propsState });
  };

  return (
    <div className='relative flex grow'>
      <form onSubmit={handleSubmit(onSubmit)} className='relative w-full'>
        <input
          defaultValue={(categoryId === 0 && name) || ''}
          {...register('inputValue', {
            onChange: (event) => {
              onChangeSearch(event.target.value);
            },
          })}
          onFocus={() => setFocus(true)}
          className='w-full rounded-[10px] border-none bg-gray-100 py-1 pl-10 pr-8 text-sm text-gray-600 placeholder:text-sm focus:outline-none focus:ring-[1.5px] focus:ring-primary'
          placeholder='Search'
        />
        <div className='center-y-axis absolute left-3'>
          <IconMagnifyingGlass
            className={cn('w-5', focus ? 'fill-primary-dark' : 'fill-gray-800')}
          />
        </div>
        {isInputValue && categoryId === 0 && (
          <div
            className='center-y-axis absolute right-3'
            onClick={() => {
              removeInputTag();
            }}
          >
            <IconCross className='h-4 w-4 fill-gray-700' />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
