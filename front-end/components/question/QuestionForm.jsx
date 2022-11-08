export default function QuestionForm() {
  const submitHandler = e => {
    e.preventDefault();
  };
  return (
    <>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6 mt-10'>
          <div className='md:col-span-1'>
            <div className='hidden sm:block' aria-hidden='true'>
              <div className='py-5'>
                <div className='border-t border-gray-200' />
              </div>
            </div>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Profile
              </h3>
              <p className='mt-1 text-sm text-white'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form onSubmit={submitHandler} action='#' method='POST'>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3 sm:col-span-2'>
                      <label
                        htmlFor='company-website'
                        className='block text-sm font-medium text-gray-700'>
                        제목
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='company-website'
                          id='company-website'
                          className='p-1 bg-white border-2 block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder='제목을 입력하세요.'
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='about'
                      className='block text-sm font-medium text-gray-700'>
                      내용
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='about'
                        name='about'
                        rows={10}
                        className='border-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white p-3 text-black'
                        placeholder='내용을 입력해 주세요'
                        defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>
    </>
  );
}
