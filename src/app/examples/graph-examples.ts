import {GrapsDUMP} from "../models/graph.model";
import {DirectionTypes, WeightTypes} from "../contants/graph.constants";

export const GRAPH_EXAMPLE_1 = {
  "vertices": [
    {
      "x": 51,
      "y": 563,
      "number": 1,
      "isClicked": false
    },
    {
      "x": 50,
      "y": 475,
      "number": 2,
      "isClicked": false
    },
    {
      "x": 46,
      "y": 392,
      "number": 3,
      "isClicked": false
    },
    {
      "x": 126,
      "y": 389,
      "number": 4,
      "isClicked": false
    },
    {
      "x": 149,
      "y": 450,
      "number": 5,
      "isClicked": false
    },
    {
      "x": 142,
      "y": 513,
      "number": 6,
      "isClicked": false
    },
    {
      "x": 235,
      "y": 563,
      "number": 7,
      "isClicked": false
    },
    {
      "x": 246,
      "y": 481,
      "number": 8,
      "isClicked": false
    },
    {
      "x": 147,
      "y": 574,
      "number": 9,
      "isClicked": false
    },
    {
      "x": 277,
      "y": 288,
      "number": 10,
      "isClicked": false
    },
    {
      "x": 167,
      "y": 264,
      "number": 11,
      "isClicked": false
    },
    {
      "x": 221,
      "y": 354,
      "number": 12,
      "isClicked": false
    },
    {
      "x": 338,
      "y": 378,
      "number": 13,
      "isClicked": false
    },
    {
      "x": 483,
      "y": 187,
      "number": 14,
      "isClicked": false
    },
    {
      "x": 279,
      "y": 126,
      "number": 15,
      "isClicked": false
    },
    {
      "x": 351,
      "y": 236,
      "number": 16,
      "isClicked": false
    },
    {
      "x": 500,
      "y": 316,
      "number": 17,
      "isClicked": false
    },
    {
      "x": 445,
      "y": 70,
      "number": 18,
      "isClicked": false
    },
    {
      "x": 509,
      "y": 97,
      "number": 19,
      "isClicked": false
    },
    {
      "x": 380,
      "y": 155,
      "number": 20,
      "isClicked": false
    },
    {
      "x": 333,
      "y": 47,
      "number": 21,
      "isClicked": false
    },
    {
      "x": 27,
      "y": 79,
      "number": 22,
      "isClicked": false
    },
    {
      "x": 67,
      "y": 199,
      "number": 23,
      "isClicked": false
    },
    {
      "x": 28,
      "y": 268,
      "number": 24,
      "isClicked": false
    },
    {
      "x": 131,
      "y": 98,
      "number": 25,
      "isClicked": false
    },
    {
      "x": 230,
      "y": 25,
      "number": 26,
      "isClicked": false
    },
    {
      "x": 434,
      "y": 439,
      "number": 27,
      "isClicked": false
    },
    {
      "x": 381,
      "y": 481,
      "number": 28,
      "isClicked": false
    },
    {
      "x": 500,
      "y": 554,
      "number": 29,
      "isClicked": false
    },
    {
      "x": 528,
      "y": 394,
      "number": 30,
      "isClicked": false
    }
  ],
  "edges": [
    {
      "from": {
        "x": 51,
        "y": 563,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 50,
        "y": 475,
        "number": 2,
        "isClicked": false
      },
      "weight": 1,
      "id": "1-2",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 50,
        "y": 475,
        "number": 2,
        "isClicked": false
      },
      "to": {
        "x": 46,
        "y": 392,
        "number": 3,
        "isClicked": false
      },
      "weight": 2,
      "id": "2-3",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 46,
        "y": 392,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 28,
        "y": 268,
        "number": 24,
        "isClicked": false
      },
      "weight": 3,
      "id": "3-24",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 28,
        "y": 268,
        "number": 24,
        "isClicked": false
      },
      "to": {
        "x": 67,
        "y": 199,
        "number": 23,
        "isClicked": false
      },
      "weight": 44,
      "id": "24-23",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 67,
        "y": 199,
        "number": 23,
        "isClicked": false
      },
      "to": {
        "x": 167,
        "y": 264,
        "number": 11,
        "isClicked": false
      },
      "weight": 23,
      "id": "23-11",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 126,
        "y": 389,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 221,
        "y": 354,
        "number": 12,
        "isClicked": false
      },
      "weight": 33,
      "id": "4-12",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 221,
        "y": 354,
        "number": 12,
        "isClicked": false
      },
      "to": {
        "x": 167,
        "y": 264,
        "number": 11,
        "isClicked": false
      },
      "weight": 33,
      "id": "12-11",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 167,
        "y": 264,
        "number": 11,
        "isClicked": false
      },
      "to": {
        "x": 126,
        "y": 389,
        "number": 4,
        "isClicked": false
      },
      "weight": 33,
      "id": "11-4",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 46,
        "y": 392,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 126,
        "y": 389,
        "number": 4,
        "isClicked": false
      },
      "weight": 1,
      "id": "3-4",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 28,
        "y": 268,
        "number": 24,
        "isClicked": false
      },
      "to": {
        "x": 167,
        "y": 264,
        "number": 11,
        "isClicked": false
      },
      "weight": 5,
      "id": "24-11",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 50,
        "y": 475,
        "number": 2,
        "isClicked": false
      },
      "to": {
        "x": 149,
        "y": 450,
        "number": 5,
        "isClicked": false
      },
      "weight": 5,
      "id": "2-5",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 51,
        "y": 563,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 142,
        "y": 513,
        "number": 6,
        "isClicked": false
      },
      "weight": 4,
      "id": "1-6",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 142,
        "y": 513,
        "number": 6,
        "isClicked": false
      },
      "to": {
        "x": 147,
        "y": 574,
        "number": 9,
        "isClicked": false
      },
      "weight": 6,
      "id": "6-9",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 147,
        "y": 574,
        "number": 9,
        "isClicked": false
      },
      "to": {
        "x": 235,
        "y": 563,
        "number": 7,
        "isClicked": false
      },
      "weight": 7,
      "id": "9-7",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 235,
        "y": 563,
        "number": 7,
        "isClicked": false
      },
      "to": {
        "x": 246,
        "y": 481,
        "number": 8,
        "isClicked": false
      },
      "weight": 8,
      "id": "7-8",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 142,
        "y": 513,
        "number": 6,
        "isClicked": false
      },
      "to": {
        "x": 483,
        "y": 187,
        "number": 14,
        "isClicked": false
      },
      "weight": 88,
      "id": "6-14",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 338,
        "y": 378,
        "number": 13,
        "isClicked": false
      },
      "to": {
        "x": 277,
        "y": 288,
        "number": 10,
        "isClicked": false
      },
      "weight": 5,
      "id": "13-10",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 221,
        "y": 354,
        "number": 12,
        "isClicked": false
      },
      "to": {
        "x": 277,
        "y": 288,
        "number": 10,
        "isClicked": false
      },
      "weight": 6,
      "id": "12-10",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 221,
        "y": 354,
        "number": 12,
        "isClicked": false
      },
      "to": {
        "x": 279,
        "y": 126,
        "number": 15,
        "isClicked": false
      },
      "weight": 23,
      "id": "12-15",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 27,
        "y": 79,
        "number": 22,
        "isClicked": false
      },
      "to": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "weight": 77,
      "id": "22-19",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 131,
        "y": 98,
        "number": 25,
        "isClicked": false
      },
      "to": {
        "x": 230,
        "y": 25,
        "number": 26,
        "isClicked": false
      },
      "weight": 2,
      "id": "25-26",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 333,
        "y": 47,
        "number": 21,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 70,
        "number": 18,
        "isClicked": false
      },
      "weight": 1,
      "id": "21-18",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 445,
        "y": 70,
        "number": 18,
        "isClicked": false
      },
      "to": {
        "x": 380,
        "y": 155,
        "number": 20,
        "isClicked": false
      },
      "weight": 1,
      "id": "18-20",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 380,
        "y": 155,
        "number": 20,
        "isClicked": false
      },
      "to": {
        "x": 500,
        "y": 316,
        "number": 17,
        "isClicked": false
      },
      "weight": 7,
      "id": "20-17",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 500,
        "y": 316,
        "number": 17,
        "isClicked": false
      },
      "to": {
        "x": 528,
        "y": 394,
        "number": 30,
        "isClicked": false
      },
      "weight": 2,
      "id": "17-30",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 528,
        "y": 394,
        "number": 30,
        "isClicked": false
      },
      "to": {
        "x": 434,
        "y": 439,
        "number": 27,
        "isClicked": false
      },
      "weight": 8,
      "id": "30-27",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 381,
        "y": 481,
        "number": 28,
        "isClicked": false
      },
      "to": {
        "x": 434,
        "y": 439,
        "number": 27,
        "isClicked": false
      },
      "weight": 2,
      "id": "28-27",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 434,
        "y": 439,
        "number": 27,
        "isClicked": false
      },
      "to": {
        "x": 500,
        "y": 554,
        "number": 29,
        "isClicked": false
      },
      "weight": 5,
      "id": "27-29",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 500,
        "y": 554,
        "number": 29,
        "isClicked": false
      },
      "to": {
        "x": 235,
        "y": 563,
        "number": 7,
        "isClicked": false
      },
      "weight": 77,
      "id": "29-7",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 246,
        "y": 481,
        "number": 8,
        "isClicked": false
      },
      "to": {
        "x": 381,
        "y": 481,
        "number": 28,
        "isClicked": false
      },
      "weight": 10,
      "id": "8-28",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 246,
        "y": 481,
        "number": 8,
        "isClicked": false
      },
      "to": {
        "x": 338,
        "y": 378,
        "number": 13,
        "isClicked": false
      },
      "weight": 18,
      "id": "8-13",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 351,
        "y": 236,
        "number": 16,
        "isClicked": false
      },
      "to": {
        "x": 131,
        "y": 98,
        "number": 25,
        "isClicked": false
      },
      "weight": 20,
      "id": "16-25",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 27,
        "y": 79,
        "number": 22,
        "isClicked": false
      },
      "to": {
        "x": 351,
        "y": 236,
        "number": 16,
        "isClicked": false
      },
      "weight": 33,
      "id": "22-16",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 351,
        "y": 236,
        "number": 16,
        "isClicked": false
      },
      "to": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "weight": 30,
      "id": "16-19",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 500,
        "y": 316,
        "number": 17,
        "isClicked": false
      },
      "to": {
        "x": 483,
        "y": 187,
        "number": 14,
        "isClicked": false
      },
      "weight": 10,
      "id": "17-14",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 483,
        "y": 187,
        "number": 14,
        "isClicked": false
      },
      "to": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "weight": 2,
      "id": "14-19",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 70,
        "number": 18,
        "isClicked": false
      },
      "weight": 2,
      "id": "19-18",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "to": {
        "x": 230,
        "y": 25,
        "number": 26,
        "isClicked": false
      },
      "weight": 20,
      "id": "19-26",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 445,
        "y": 70,
        "number": 18,
        "isClicked": false
      },
      "to": {
        "x": 230,
        "y": 25,
        "number": 26,
        "isClicked": false
      },
      "weight": 20,
      "id": "18-26",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 230,
        "y": 25,
        "number": 26,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 70,
        "number": 18,
        "isClicked": false
      },
      "weight": 10,
      "id": "26-18",
      "isReverseEdge": true
    },
    {
      "from": {
        "x": 277,
        "y": 288,
        "number": 10,
        "isClicked": false
      },
      "to": {
        "x": 27,
        "y": 79,
        "number": 22,
        "isClicked": false
      },
      "weight": 30,
      "id": "10-22",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 67,
        "y": 199,
        "number": 23,
        "isClicked": false
      },
      "to": {
        "x": 27,
        "y": 79,
        "number": 22,
        "isClicked": false
      },
      "weight": 10,
      "id": "23-22",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 338,
        "y": 378,
        "number": 13,
        "isClicked": false
      },
      "to": {
        "x": 509,
        "y": 97,
        "number": 19,
        "isClicked": false
      },
      "weight": 66,
      "id": "13-19",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 434,
        "y": 439,
        "number": 27,
        "isClicked": false
      },
      "to": {
        "x": 338,
        "y": 378,
        "number": 13,
        "isClicked": false
      },
      "weight": 1,
      "id": "27-13",
      "isReverseEdge": false
    }
  ],
  "direction": DirectionTypes.DIRECTED_GRAPH,
  "weighted": WeightTypes.WEIGHTED_GRAPH
}

export const GRAPH_EXAMPLE_2 = {
  "vertices": [
    {
      "x": 190,
      "y": 109,
      "number": 1,
      "isClicked": false
    },
    {
      "x": 373,
      "y": 86,
      "number": 2,
      "isClicked": false
    },
    {
      "x": 294,
      "y": 215,
      "number": 3,
      "isClicked": false
    },
    {
      "x": 144,
      "y": 228,
      "number": 4,
      "isClicked": false
    },
    {
      "x": 288,
      "y": 410,
      "number": 5,
      "isClicked": false
    },
    {
      "x": 414,
      "y": 299,
      "number": 6,
      "isClicked": false
    },
    {
      "x": 445,
      "y": 443,
      "number": 7,
      "isClicked": false
    },
    {
      "x": 88,
      "y": 559,
      "number": 8,
      "isClicked": false
    },
    {
      "x": 20,
      "y": 438,
      "number": 9,
      "isClicked": false
    }
  ],
  "edges": [
    {
      "from": {
        "x": 190,
        "y": 109,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 373,
        "y": 86,
        "number": 2,
        "isClicked": false
      },
      "weight": "1",
      "id": "1-2",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 373,
        "y": 86,
        "number": 2,
        "isClicked": false
      },
      "to": {
        "x": 294,
        "y": 215,
        "number": 3,
        "isClicked": false
      },
      "weight": "2",
      "id": "2-3",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 288,
        "y": 410,
        "number": 5,
        "isClicked": false
      },
      "to": {
        "x": 414,
        "y": 299,
        "number": 6,
        "isClicked": false
      },
      "weight": "3",
      "id": "5-6",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 288,
        "y": 410,
        "number": 5,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 443,
        "number": 7,
        "isClicked": false
      },
      "weight": "4",
      "id": "5-7",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 288,
        "y": 410,
        "number": 5,
        "isClicked": false
      },
      "to": {
        "x": 88,
        "y": 559,
        "number": 8,
        "isClicked": false
      },
      "weight": "5",
      "id": "5-8",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 20,
        "y": 438,
        "number": 9,
        "isClicked": false
      },
      "to": {
        "x": 88,
        "y": 559,
        "number": 8,
        "isClicked": false
      },
      "weight": "6",
      "id": "9-8",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 414,
        "y": 299,
        "number": 6,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 443,
        "number": 7,
        "isClicked": false
      },
      "weight": "7",
      "id": "6-7",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 288,
        "y": 410,
        "number": 5,
        "isClicked": false
      },
      "to": {
        "x": 144,
        "y": 228,
        "number": 4,
        "isClicked": false
      },
      "weight": "8",
      "id": "5-4",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 144,
        "y": 228,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 20,
        "y": 438,
        "number": 9,
        "isClicked": false
      },
      "weight": "9",
      "id": "4-9",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 144,
        "y": 228,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 190,
        "y": 109,
        "number": 1,
        "isClicked": false
      },
      "weight": "10",
      "id": "4-1",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 144,
        "y": 228,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 294,
        "y": 215,
        "number": 3,
        "isClicked": false
      },
      "weight": "11",
      "id": "4-3",
      "isReverseEdge": false
    }
  ],
  "direction": DirectionTypes.UNDIRECTED_GRAPH,
  "weighted": WeightTypes.WEIGHTED_GRAPH
}

export const GRAPH_EXAMPLE_3 = {
  "vertices": [
    {
      "x": 40,
      "y": 491,
      "number": 1,
      "isClicked": false
    },
    {
      "x": 35,
      "y": 394,
      "number": 2,
      "isClicked": false
    },
    {
      "x": 37,
      "y": 330,
      "number": 3,
      "isClicked": false
    },
    {
      "x": 42,
      "y": 252,
      "number": 4,
      "isClicked": false
    },
    {
      "x": 34,
      "y": 189,
      "number": 5,
      "isClicked": false
    },
    {
      "x": 31,
      "y": 123,
      "number": 6,
      "isClicked": false
    },
    {
      "x": 30,
      "y": 73,
      "number": 7,
      "isClicked": false
    },
    {
      "x": 99,
      "y": 29,
      "number": 8,
      "isClicked": false
    },
    {
      "x": 215,
      "y": 39,
      "number": 9,
      "isClicked": false
    },
    {
      "x": 347,
      "y": 27,
      "number": 10,
      "isClicked": false
    },
    {
      "x": 478,
      "y": 37,
      "number": 11,
      "isClicked": false
    },
    {
      "x": 583,
      "y": 34,
      "number": 12,
      "isClicked": false
    },
    {
      "x": 615,
      "y": 87,
      "number": 13,
      "isClicked": false
    },
    {
      "x": 605,
      "y": 156,
      "number": 14,
      "isClicked": false
    },
    {
      "x": 611,
      "y": 257,
      "number": 15,
      "isClicked": false
    },
    {
      "x": 599,
      "y": 344,
      "number": 16,
      "isClicked": false
    },
    {
      "x": 602,
      "y": 433,
      "number": 17,
      "isClicked": false
    },
    {
      "x": 594,
      "y": 505,
      "number": 18,
      "isClicked": false
    },
    {
      "x": 548,
      "y": 509,
      "number": 19,
      "isClicked": false
    },
    {
      "x": 465,
      "y": 508,
      "number": 20,
      "isClicked": false
    },
    {
      "x": 373,
      "y": 518,
      "number": 21,
      "isClicked": false
    },
    {
      "x": 301,
      "y": 520,
      "number": 22,
      "isClicked": false
    },
    {
      "x": 217,
      "y": 514,
      "number": 23,
      "isClicked": false
    },
    {
      "x": 137,
      "y": 509,
      "number": 24,
      "isClicked": false
    },
    {
      "x": 166,
      "y": 435,
      "number": 25,
      "isClicked": false
    },
    {
      "x": 260,
      "y": 356,
      "number": 26,
      "isClicked": false
    },
    {
      "x": 300,
      "y": 311,
      "number": 27,
      "isClicked": false
    },
    {
      "x": 364,
      "y": 241,
      "number": 28,
      "isClicked": false
    },
    {
      "x": 463,
      "y": 155,
      "number": 29,
      "isClicked": false
    },
    {
      "x": 158,
      "y": 127,
      "number": 30,
      "isClicked": false
    },
    {
      "x": 240,
      "y": 176,
      "number": 31,
      "isClicked": false
    },
    {
      "x": 290,
      "y": 217,
      "number": 32,
      "isClicked": false
    },
    {
      "x": 409,
      "y": 323,
      "number": 33,
      "isClicked": false
    },
    {
      "x": 465,
      "y": 388,
      "number": 34,
      "isClicked": false
    },
    {
      "x": 521,
      "y": 414,
      "number": 35,
      "isClicked": false
    }
  ],
  "edges": [
    {
      "from": {
        "x": 30,
        "y": 73,
        "number": 7,
        "isClicked": false
      },
      "to": {
        "x": 99,
        "y": 29,
        "number": 8,
        "isClicked": false
      },
      "id": "7-8",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 99,
        "y": 29,
        "number": 8,
        "isClicked": false
      },
      "to": {
        "x": 215,
        "y": 39,
        "number": 9,
        "isClicked": false
      },
      "id": "8-9",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 215,
        "y": 39,
        "number": 9,
        "isClicked": false
      },
      "to": {
        "x": 478,
        "y": 37,
        "number": 11,
        "isClicked": false
      },
      "id": "9-11",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 347,
        "y": 27,
        "number": 10,
        "isClicked": false
      },
      "to": {
        "x": 583,
        "y": 34,
        "number": 12,
        "isClicked": false
      },
      "id": "10-12",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 583,
        "y": 34,
        "number": 12,
        "isClicked": false
      },
      "to": {
        "x": 615,
        "y": 87,
        "number": 13,
        "isClicked": false
      },
      "id": "12-13",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 615,
        "y": 87,
        "number": 13,
        "isClicked": false
      },
      "to": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "id": "13-29",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "to": {
        "x": 605,
        "y": 156,
        "number": 14,
        "isClicked": false
      },
      "id": "29-14",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 615,
        "y": 87,
        "number": 13,
        "isClicked": false
      },
      "to": {
        "x": 611,
        "y": 257,
        "number": 15,
        "isClicked": false
      },
      "id": "13-15",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 611,
        "y": 257,
        "number": 15,
        "isClicked": false
      },
      "to": {
        "x": 602,
        "y": 433,
        "number": 17,
        "isClicked": false
      },
      "id": "15-17",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 602,
        "y": 433,
        "number": 17,
        "isClicked": false
      },
      "to": {
        "x": 548,
        "y": 509,
        "number": 19,
        "isClicked": false
      },
      "id": "17-19",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 594,
        "y": 505,
        "number": 18,
        "isClicked": false
      },
      "to": {
        "x": 521,
        "y": 414,
        "number": 35,
        "isClicked": false
      },
      "id": "18-35",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 521,
        "y": 414,
        "number": 35,
        "isClicked": false
      },
      "to": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "id": "35-33",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 364,
        "y": 241,
        "number": 28,
        "isClicked": false
      },
      "id": "33-28",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 364,
        "y": 241,
        "number": 28,
        "isClicked": false
      },
      "to": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "id": "28-29",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "to": {
        "x": 290,
        "y": 217,
        "number": 32,
        "isClicked": false
      },
      "id": "29-32",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 290,
        "y": 217,
        "number": 32,
        "isClicked": false
      },
      "to": {
        "x": 240,
        "y": 176,
        "number": 31,
        "isClicked": false
      },
      "id": "32-31",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 240,
        "y": 176,
        "number": 31,
        "isClicked": false
      },
      "to": {
        "x": 158,
        "y": 127,
        "number": 30,
        "isClicked": false
      },
      "id": "31-30",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 158,
        "y": 127,
        "number": 30,
        "isClicked": false
      },
      "to": {
        "x": 31,
        "y": 123,
        "number": 6,
        "isClicked": false
      },
      "id": "30-6",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 30,
        "y": 73,
        "number": 7,
        "isClicked": false
      },
      "to": {
        "x": 158,
        "y": 127,
        "number": 30,
        "isClicked": false
      },
      "id": "7-30",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 158,
        "y": 127,
        "number": 30,
        "isClicked": false
      },
      "to": {
        "x": 34,
        "y": 189,
        "number": 5,
        "isClicked": false
      },
      "id": "30-5",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 34,
        "y": 189,
        "number": 5,
        "isClicked": false
      },
      "to": {
        "x": 290,
        "y": 217,
        "number": 32,
        "isClicked": false
      },
      "id": "5-32",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 42,
        "y": 252,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 300,
        "y": 311,
        "number": 27,
        "isClicked": false
      },
      "id": "4-27",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 37,
        "y": 330,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 260,
        "y": 356,
        "number": 26,
        "isClicked": false
      },
      "id": "3-26",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 35,
        "y": 394,
        "number": 2,
        "isClicked": false
      },
      "to": {
        "x": 166,
        "y": 435,
        "number": 25,
        "isClicked": false
      },
      "id": "2-25",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 40,
        "y": 491,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 137,
        "y": 509,
        "number": 24,
        "isClicked": false
      },
      "id": "1-24",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 137,
        "y": 509,
        "number": 24,
        "isClicked": false
      },
      "to": {
        "x": 166,
        "y": 435,
        "number": 25,
        "isClicked": false
      },
      "id": "24-25",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 166,
        "y": 435,
        "number": 25,
        "isClicked": false
      },
      "to": {
        "x": 260,
        "y": 356,
        "number": 26,
        "isClicked": false
      },
      "id": "25-26",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 260,
        "y": 356,
        "number": 26,
        "isClicked": false
      },
      "to": {
        "x": 300,
        "y": 311,
        "number": 27,
        "isClicked": false
      },
      "id": "26-27",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 300,
        "y": 311,
        "number": 27,
        "isClicked": false
      },
      "to": {
        "x": 290,
        "y": 217,
        "number": 32,
        "isClicked": false
      },
      "id": "27-32",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 290,
        "y": 217,
        "number": 32,
        "isClicked": false
      },
      "to": {
        "x": 364,
        "y": 241,
        "number": 28,
        "isClicked": false
      },
      "id": "32-28",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 364,
        "y": 241,
        "number": 28,
        "isClicked": false
      },
      "to": {
        "x": 300,
        "y": 311,
        "number": 27,
        "isClicked": false
      },
      "id": "28-27",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 300,
        "y": 311,
        "number": 27,
        "isClicked": false
      },
      "to": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "id": "27-33",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "id": "33-29",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 373,
        "y": 518,
        "number": 21,
        "isClicked": false
      },
      "id": "33-21",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 465,
        "y": 508,
        "number": 20,
        "isClicked": false
      },
      "id": "33-20",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 465,
        "y": 388,
        "number": 34,
        "isClicked": false
      },
      "id": "33-34",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 301,
        "y": 520,
        "number": 22,
        "isClicked": false
      },
      "id": "33-22",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "to": {
        "x": 217,
        "y": 514,
        "number": 23,
        "isClicked": false
      },
      "id": "33-23",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 548,
        "y": 509,
        "number": 19,
        "isClicked": false
      },
      "to": {
        "x": 521,
        "y": 414,
        "number": 35,
        "isClicked": false
      },
      "id": "19-35",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 599,
        "y": 344,
        "number": 16,
        "isClicked": false
      },
      "to": {
        "x": 611,
        "y": 257,
        "number": 15,
        "isClicked": false
      },
      "id": "16-15",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 611,
        "y": 257,
        "number": 15,
        "isClicked": false
      },
      "to": {
        "x": 409,
        "y": 323,
        "number": 33,
        "isClicked": false
      },
      "id": "15-33",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 347,
        "y": 27,
        "number": 10,
        "isClicked": false
      },
      "to": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "id": "10-29",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 463,
        "y": 155,
        "number": 29,
        "isClicked": false
      },
      "to": {
        "x": 478,
        "y": 37,
        "number": 11,
        "isClicked": false
      },
      "id": "29-11",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 240,
        "y": 176,
        "number": 31,
        "isClicked": false
      },
      "to": {
        "x": 215,
        "y": 39,
        "number": 9,
        "isClicked": false
      },
      "id": "31-9",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 158,
        "y": 127,
        "number": 30,
        "isClicked": false
      },
      "to": {
        "x": 99,
        "y": 29,
        "number": 8,
        "isClicked": false
      },
      "id": "30-8",
      "isReverseEdge": false
    }
  ],
  "direction": DirectionTypes.UNDIRECTED_GRAPH,
  "weighted": WeightTypes.UNWEIGHTED_GRAPH
}

export const GRAPH_EXAMPLE_4 = {
  "vertices": [
    {
      "x": 93,
      "y": 303,
      "number": 1,
      "isClicked": false
    },
    {
      "x": 197,
      "y": 200,
      "number": 2,
      "isClicked": false
    },
    {
      "x": 193,
      "y": 394,
      "number": 3,
      "isClicked": false
    },
    {
      "x": 347,
      "y": 203,
      "number": 4,
      "isClicked": false
    },
    {
      "x": 353,
      "y": 382,
      "number": 5,
      "isClicked": false
    },
    {
      "x": 445,
      "y": 278,
      "number": 6,
      "isClicked": false
    }
  ],
  "edges": [
    {
      "from": {
        "x": 93,
        "y": 303,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 197,
        "y": 200,
        "number": 2,
        "isClicked": false
      },
      "weight": "3",
      "id": "1-2",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 93,
        "y": 303,
        "number": 1,
        "isClicked": false
      },
      "to": {
        "x": 193,
        "y": 394,
        "number": 3,
        "isClicked": false
      },
      "weight": "1",
      "id": "1-3",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 193,
        "y": 394,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 197,
        "y": 200,
        "number": 2,
        "isClicked": false
      },
      "weight": "1",
      "id": "3-2",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 193,
        "y": 394,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 347,
        "y": 203,
        "number": 4,
        "isClicked": false
      },
      "weight": "3",
      "id": "3-4",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 193,
        "y": 394,
        "number": 3,
        "isClicked": false
      },
      "to": {
        "x": 353,
        "y": 382,
        "number": 5,
        "isClicked": false
      },
      "weight": "5",
      "id": "3-5",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 347,
        "y": 203,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 353,
        "y": 382,
        "number": 5,
        "isClicked": false
      },
      "weight": "7",
      "id": "4-5",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 197,
        "y": 200,
        "number": 2,
        "isClicked": false
      },
      "to": {
        "x": 347,
        "y": 203,
        "number": 4,
        "isClicked": false
      },
      "weight": "1",
      "id": "2-4",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 347,
        "y": 203,
        "number": 4,
        "isClicked": false
      },
      "to": {
        "x": 445,
        "y": 278,
        "number": 6,
        "isClicked": false
      },
      "weight": "12",
      "id": "4-6",
      "isReverseEdge": false
    },
    {
      "from": {
        "x": 445,
        "y": 278,
        "number": 6,
        "isClicked": false
      },
      "to": {
        "x": 353,
        "y": 382,
        "number": 5,
        "isClicked": false
      },
      "weight": "12",
      "id": "6-5",
      "isReverseEdge": false
    }
  ],
  "direction": DirectionTypes.DIRECTED_GRAPH,
  "weighted": WeightTypes.WEIGHTED_GRAPH
}
