import '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { makeAutoObservable } from 'mobx';
import auth from '@react-native-firebase/auth';
import { NavigationProp } from '@react-navigation/native';


interface IData {
  title: string;
  text: string;
  status: string;
}

class NotesStore {
  userData: {
    data: IData;
    id: string;
  }[] = [];
  refreshing = false;

  constructor() {
    makeAutoObservable(this);
  }

    async getNotes() {
        try {
            this.userData = []
            const res = await firestore()
            .collection('notes')
            .doc(`${auth().currentUser?.email}`)
            .collection('note')
            .get()
                const documentSnapshot = await res;
                this.userData = documentSnapshot.docs.map(doc => ({
                    data: {
                        title: doc.data()?.title || '',
                        text: doc.data()?.text || '',
                        status: doc.data()?.status || '',
                    },
                    id: doc.id,
                }));
            } catch {
            console.log("err");
        }
        return this.userData;
    }

    async refreshNote() {
        this.refreshing = true;
        await this.getNotes()
        this.refreshing = false;
    };  

    async addNotes(navigation:NavigationProp<any>, title?: string, text?: string) {
        const ref = firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note');
        const item = await ref.add({title: title, text: text, status:"В планах"});
        await this.refreshNote();
        navigation.navigate('note', {data: {title, text}, noteId: item.id});
    };

    async editNote (title:string, text:string, status: string, nodeId:string) {
        await firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note')
          .doc(nodeId)
          .set({title: title, text: text, status: status});
        await this.refreshNote();
    };

    async deleteNote (navigation:NavigationProp<any>, noteId:string | undefined) {
        await firestore()
          .collection('notes')
          .doc(`${auth().currentUser?.email}`)
          .collection('note')
          .doc(noteId).delete();
        await this.refreshNote();
        navigation.navigate('home');
    };

}

export const notesStore = new NotesStore();
