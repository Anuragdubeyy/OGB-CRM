import { RowType } from "../../constant"



export const overviewColumn = [
    {
        accessorKey: 'total_user',
        header:'Customer',
    },
    {
        accessorKey: 'agent',
        header:'Agent',
    },
    {
        accessorKey: 'locker_manager',
        header:'Locker Manager',
    },
    {
        accessorKey: 'total_gold_weight',
        header:'Gold weight',
    },
    {
        accessorKey: 'total_ornament_value',
        header:'Gold value',
    },
    {
        accessorKey: 'trips',
        header:'Trips',
    },
    {
        accessorKey: 'total_barter_user',
        header:'Barter Members',
    },
    {
        accessorKey: 'barters',
        header:'Barters',
    },
    {
        accessorKey: 'Total_deposited_ornament',
        header:'Deposited',
    },
    {
        accessorKey: 'total_withdraw_ornament',
        header:'Withdraw',
    },

]

export const bookingSlotColumn =[
    {
        accessorKey: 'timeSlot',
        header:'Time',
    },
    {
        accessorKey: 'value',
        header:'Slot',
    },
]

export const overviewRecentRequestColumn = [
    {
        accessorKey: 'id',
        header: 'Sl No.',
        cell: ({ row }: { row: RowType }) => <div>{row.index + 1}</div>,
      },
    {
        accessorKey: 'name',
        header:'Name',
    },
    {
        accessorKey: 'phone',
        header:'Phone',
    },
    {
        accessorKey: 'recent_request',
        header:'Recent Request',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'time',
        header:'Time',
    },
    {
        accessorKey: 'status',
        header:'Status',
    },
]

export const depositColumn = [
    {
        accessorKey: 'name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
export const barterColumn = [
    {
        accessorKey: 'user.name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
export const displayColumn = [
    {
        accessorKey: 'user.name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
export const withdrawColumn = [
    {
        accessorKey: 'user.name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
export const soldColumn = [
    {
        accessorKey: 'user.name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
export const immediateColumn = [
    {
        accessorKey: 'user.name',
        header:'Name',
    },
    {
        accessorKey: 'date',
        header:'Date',
    },
    {
        accessorKey: 'status',
        header:'status',
    },
    
]
