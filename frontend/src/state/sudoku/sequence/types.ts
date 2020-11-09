export const INITIALIZE_SEQUENCE = 'INITIALIZE_SEQUENCE';
export const PUSH_SEQUENCE = 'PUSH_SEQUENCE';
export const POP_SEQUENCE = 'POP_SEQUENCE';

interface InitializeSequenceAction {
    type: typeof INITIALIZE_SEQUENCE;
}

interface PushSequenceAction {
    type: typeof PUSH_SEQUENCE;
    payload: number;
}

interface PopSequenceAction {
    type: typeof POP_SEQUENCE;
}

export type ActionTypes = InitializeSequenceAction | PushSequenceAction | PopSequenceAction;