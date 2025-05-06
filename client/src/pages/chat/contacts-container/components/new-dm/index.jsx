import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Lottie from 'react-lottie'
import { animationDefaultOptions, getColor } from '@/lib/utils'
import apiClient from '@/lib/api-client'
import { HOST, SEARCH_CONTACTS_ROUTE } from '@/utils/constants'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useAppStore } from '@/store'


const NewDm = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [openNewContact, setOpenNewContact] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])

    const searchContact = async (searchTerm) => {
        try {
            console.log(searchTerm)
            if (searchTerm.length > 0) {
                const res = await apiClient.post(
                    SEARCH_CONTACTS_ROUTE,
                    { searchTerm },
                    { withCredentials: true }
                )
                if (res.status === 200 && res.data.contacts) {
                    setSearchedContacts(res.data.contacts)
                }
            } else {
                setSearchedContacts([])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const selectNewContact = (contact) => {
        setOpenNewContact(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className='text-neutral-400 text-xl cursor-pointer hover:text-white transition-all duration-300 ease-in-out'
                            onClick={() => setOpenNewContact(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className={"bg-[#1b1c24] text-white text-sm font-normal"}>
                        Select a new contact here.
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContact} onOpenChange={setOpenNewContact}>
                <DialogContent className={'bg-[#181928] border-none text-white w-[400px] h-[400px] flex flex-col'}>
                    <DialogHeader>
                        <DialogTitle>Please select a contact.</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder='Search Contacts' className={'rounded-lg p-6 bg-[#2c2e3b] border-none'}
                            onChange={e => searchContact(e.target.value)}
                        />
                    </div>
                    {
                        searchedContacts.length > 0 && (
                            <ScrollArea className='h-[250px]'>
                                <div className='flex flex-col gap-5'>
                                    {searchedContacts.map((contact) => (
                                        <div
                                            key={contact._id}
                                            className="flex gap-3 items-center cursor-pointer"
                                            onClick={() => selectNewContact(contact)}
                                        >
                                            <div className="w-12 h-12 relative">
                                                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                    {contact.image ? (
                                                        <AvatarImage
                                                            src={`${HOST}/${contact.image}`}
                                                            alt="profile"
                                                            className="object-cover w-full h-full bg-black"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                                                contact.color
                                                            )}`}
                                                        >
                                                            {contact.firstName
                                                                ? contact.firstName.split("")[0]
                                                                : contact.email.split("")[0]}
                                                        </div>
                                                    )}
                                                </Avatar>
                                            </div>
                                            <div className="flex flex-col">
                                                <span>
                                                    {contact.firstName && contact.lastName
                                                        ? `${contact.firstName} ${contact.lastName}`
                                                        : contact.email}
                                                </span>
                                                <span className="text-xs">{contact.email}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}

                    {
                        searchedContacts.length <= 0 && <div className='flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all mt-5 md:mt-0'>
                            <Lottie
                                isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animationDefaultOptions}
                            />
                            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
                                <div className="poppins-medium">
                                    Hi <span className='text-purple-500'>!</span> Search New
                                    <span className='text-purple-500'> Contact </span>
                                    <span className='text-purple-500'>.</span>
                                </div>

                            </div>
                        </div>
                    }
                </DialogContent>
            </Dialog>


        </>
    )
}

export default NewDm
