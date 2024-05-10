export const MY_VIEW_P_ID = "0x884e23E783F5a78DcF0047f035742BeccB6D97C4";

export const ABI_STORAGE = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_sign_key",
        type: "string",
      },
      {
        internalType: "string",
        name: "_owner",
        type: "string",
      },
      {
        internalType: "string",
        name: "unique_id_pic",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name_of_event",
        type: "string",
      },
      {
        internalType: "string",
        name: "_start_date",
        type: "string",
      },
      {
        internalType: "string",
        name: "_end_date",
        type: "string",
      },
      {
        internalType: "string",
        name: "sep",
        type: "string",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "picture_with_signer",
    outputs: [
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
      {
        internalType: "string",
        name: "sep",
        type: "string",
      },
      {
        internalType: "string",
        name: "sign_key",
        type: "string",
      },
      {
        internalType: "string",
        name: "start_date",
        type: "string",
      },
      {
        internalType: "string",
        name: "end_date",
        type: "string",
      },
      {
        internalType: "string",
        name: "name_of_event",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "unique_id_pic",
        type: "string",
      },
    ],
    name: "retrieve",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "owner",
            type: "string",
          },
          {
            internalType: "string",
            name: "sep",
            type: "string",
          },
          {
            internalType: "string",
            name: "sign_key",
            type: "string",
          },
          {
            internalType: "string",
            name: "start_date",
            type: "string",
          },
          {
            internalType: "string",
            name: "end_date",
            type: "string",
          },
          {
            internalType: "string",
            name: "name_of_event",
            type: "string",
          },
        ],
        internalType: "struct Storage.pict_signer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];